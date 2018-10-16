import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private router: Router, private personService: PersonService) { }

  ngOnInit() { 

    if (this.personService.getPerson()) {
      this.person = this.personService.getPerson();
    }

    this.personService.savePersonSync().subscribe((response) => {
      if(response){
        console.log('sync');
      }
    });
  }

  onlyLetter(event: any) {

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

  onlyNumber(event: any) {

    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);

    if (event.keyCode == '9' || event.keyCode == '8') {
      return true;
    }

    if (!pattern.test(inputChar)) {
      return false;
    }
  }

  save(){
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
        this.setPersonSession();
      }

      this.personService.setPerson(this.person);

      this.personService.savePerson(this.person).subscribe((response) => {
				if(response){
          this.person.sync = false;
          this.setPersonSession();
        }
			},
      error => {
        this.setPersonSession();
      });
    }
  }

  private setPersonSession(){

    let persons = this.personService.getPersons();
    
    if(!persons) persons = [];
    
    persons.forEach((item, index) => {
      if(item.id === this.person.id){
        persons.splice(index, 1);
        persons.push(this.person);
      }
    });

    if(!persons.find(item => item.id === this.person.id)){
      persons.push(this.person)
    }

    if(Array.isArray(persons)  && !persons.length){
      this.personService.setPersons(persons);
    }

    this.router.navigate(['/list']);
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
