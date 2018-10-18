import { Router, NavigationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

import { Person, PersonRace } from '../shared/person/person';
import { PersonService } from '../shared/person/person.service';
import { ContactService } from '../shared/contact/contact.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public persons: Array<Person>;
  public personRace = PersonRace;

  constructor(
    private router: Router, 
    private personService: PersonService, 
    private contactService: ContactService,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.personService.setPerson(null);
    this.persons = this.personService.getPersons();
  }

  public removePerson(person) {
    
    if(Array.isArray(this.persons)){
      this.persons.forEach((item, index) => {
        if(item.id === person.id){
          this.removeContactsPerson(person)
          this.personService.removePerson(person.id);
          this.persons.splice(index, 1);
        }
      });
    }

    this.personService.setPersons(this.persons);
  }

  public removeContactsPerson(person) {
    let contacts = this.contactService.getContacts();

    if(Array.isArray(contacts)){
      contacts.forEach((contact, index) => {
        if(contact.person === person.id){
          contacts.splice(index, 1);
        }
      });

      this.contactService.setContacts(contacts);
    }
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