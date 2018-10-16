import { Router, NavigationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

import { Person, PersonRace } from '../shared/person/person';
import { PersonService } from '../shared/person/person.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public persons: Array<Person>;
  public personRace = PersonRace;

  constructor(private router: Router, private personService: PersonService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.personService.setPerson(null);
    this.persons = this.personService.getPersons();
  }

  public removePerson(person) {
    
    if (this.persons.find(item => item.id == person.id)) {
      this.persons.splice(person, 1);
    }
    this.personService.setPersons(this.persons);
  }

  public editar(person) {
    this.personService.setPerson(person);

    this.router.navigate(['/cadastre']);
  }


  public remover(person) {
    this.confirmationService.confirm({
      header: 'Atenção',
      message: 'Você tem certeza que deseja excluir esta pessoa?',
      icon: 'pi pi-info-circle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.removePerson(person);
      }
    });
  }

  public getSexPerson(sex){
    const race =  this.personRace.find(item => item.id == sex);
    if(race) return race.label;
  }


}
