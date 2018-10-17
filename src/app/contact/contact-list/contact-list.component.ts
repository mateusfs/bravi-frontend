import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';

import { Person } from '../../shared/person/person';
import { Contact } from '../../shared/contact/contact';
import { ContactService } from '../../shared/contact/contact.service';
import { PersonService } from '../../shared/person/person.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})

export class ContactListComponent implements OnInit {

  public person = new Person();
  public contacts: Array<Contact>;

  constructor(
    private router: Router, 
    private contactService: ContactService,
    private confirmationService: ConfirmationService,
    private personService: PersonService) { }

  ngOnInit() {

    if (this.personService.getPerson()) {
      this.person = this.personService.getPerson();
    }else{
      this.router.navigate(['/cadastre']);
    }

    this.contactService.setContact(null);
    this.contacts = this.contactService.getContactsPerson();

    if(!this.contactService.getContactSync()){
			this.contactService.initialContactsSync();
    }
    
  }

  public editar(contact) {
    this.contactService.setContact(contact);

    this.router.navigate(['/contact/edit']);
  }

  public back(){
    this.router.navigate(['/cadastre/']);
  }

  public remover(contact) {
    this.confirmationService.confirm({
      header: 'Atenção',
      message: 'Você tem certeza que deseja remover este contato?',
      icon: 'pi pi-info-circle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.removeContact(contact);
      }
    });
  }

  public removeContact(contact) {
    
    if(Array.isArray(this.contacts)){
      this.contacts.forEach((item, index) => {
        if(item.id === contact.id){
          this.contactService.removeContact(contact.id);
          this.contacts.splice(index, 1);
        }
      });
    }
    
    this.contactService.setContacts(this.contacts);
  }

  public cadastre(){
    this.router.navigate(['/contact/edit/']);
  }
}
