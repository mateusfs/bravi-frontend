import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Person, PersonRace } from '../shared/person/person';
import { PersonService } from '../shared/person/person.service';

@Component({
  selector: 'app-cadastre',
  templateUrl: './cadastre.component.html',
  styleUrls: ['./cadastre.component.css']
})

export class CadastreComponent implements OnInit {

  public person = new Person();
  public persons: Array<Person>;
  public formulario: FormGroup;
  public personRace = PersonRace;

  constructor(
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private personService: PersonService) { }

  ngOnInit() { 

    this.getPersonApi();

    if (this.personService.getPerson()) {
      this.person = this.personService.getPerson();
    }

    if(this.personService.getPersonsSync() && this.personService.getPersonsSync().length){
			this.personService.initialPersonsSync();
    }
  }

  /**
   *  METHOD CALL BY URL
   */
  private getPersonApi(){
    this.activatedRoute.params.subscribe((value) => {
      if(value && value.id){
        this.personService.getPersonApi(value.id).subscribe((person) => {
          if(person){
            this.person = person;
            this.person.id = value.id;
            this.setPersonSession(false);
          }
        });  
      }
    });
  }

  public onlyLetter(event: any) {

    const pattern = /^[a-zA-Z]/;
    const inputChar = String.fromCharCode(event.charCode);

    if (event.keyCode == '32') {
      return true;
    }

    if (!pattern.test(inputChar)) {
      return false;
    }

    return true;
  }

  public onlyNumber(event: any) {

    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);

    if (event.keyCode == '9' || event.keyCode == '8') {
      return true;
    }

    if (!pattern.test(inputChar)) {
      return false;
    }
  }

  public save(){
    this.formulario = new FormGroup({
      'name': new FormControl(this.person.name, [
        Validators.required,
        Validators.minLength(4)
      ]),
      'sex': new FormControl(this.person.sex, [
        Validators.required,
      ]),
      'age': new FormControl(this.person.age, [
        Validators.required,
      ])
    });

    if (this.formulario.status === 'VALID') {
      
      if(!this.person.id){
        this.person.id = this.personService.generateId();
        this.person.sync = true;
      }

      this.personService.setPerson(this.person);

      this.personService.savePerson(this.person).subscribe((response) => {
				if(response){
          this.person.sync = false;
          this.setPersonSession(true);
        }
			},
      error => {
        this.setPersonSession(true);
      });
    }
  }

  private setPersonSession(router){

    let persons = this.personService.getPersons();
    
    if(!persons) persons = [];
    
    persons.forEach((item, index) => {
      if(item.id === this.person.id){
        persons.splice(index, 1);
        persons.push(this.person);
      }
    });

    if(!persons.find(item => item.id === this.person.id)){
      persons.push(this.person);
    }

    if(Array.isArray(persons)  && persons.length){
       this.personService.setPersons(persons);
    }

    if(router){
      this.router.navigate(['/list']);
    }
  }
  
  public isValidade(name){
    if(!this.formulario) return false;
    return this.formulario.controls[name].status === 'INVALID';
  }

  public addContact(){
    this.router.navigate(['/contact/list/']);
  }

  public disabledPerson(){
    return !(this.person.name && this.person.sex && this.person.age);
  }

}