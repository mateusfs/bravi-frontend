import { Router, NavigationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

import { Person } from '../shared/person/person';
import { PersonService } from '../shared/person/person.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public persons: Array<Person>;

  constructor(private router: Router, private personService: PersonService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.persons = this.personService.getPersons();
    if(!this.persons) this.persons = [];
  }

  removePerson(person) {
    
    if (this.persons.find(person, 0)) {
      this.persons.splice(person, 1);
    }
    this.personService.setPersons(this.persons);
  }

  editar(person) {
    this.personService.setPerson(person);

    this.router.navigate(['/start']);
  }


  remover(person) {
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


}
