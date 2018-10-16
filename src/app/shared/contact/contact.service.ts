import { Injectable } from '@angular/core';
import { SessionService } from '../session/session.service';
import { ServiceUrlBuilder, UrlType } from '../core/url-builder.service';
import { HttpClient } from '@angular/common/http';

import { throwError as observableThrowError, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { PersonService } from '../person/person.service';

@Injectable()
export class ContactService {

  constructor(private SessionService: SessionService, private http: HttpClient, private personService: PersonService) { }

  getContact() {
    return JSON.parse(this.SessionService.getValor('contact'));
  }

  setContact(contact) {
    this.SessionService.setValor('contact', JSON.stringify(contact));
  }

  getContactsPerson() {
    const person = this.personService.getPerson();
    if(person){
      let contacts = this.getContacts();
      let contactsPerson = [];
      if(Array.isArray(contacts)){
        contacts.forEach(contact => {
            if(contact.person == person.id){
              contactsPerson.push(contact);
            }
        });
      }
      return contactsPerson;
    }
  }

  getContacts() {
    return JSON.parse(this.SessionService.getValor('contacts'));
  }

  setContacts(contacts) {
    this.SessionService.setValor('contacts', JSON.stringify(contacts));
  }

  generateId(){
    return (Math.random().toString(36).toUpperCase()+ Math.random().toString(36).substring(2, 15).toUpperCase()).replace('.', '');
  }

  getContactSync(){
    const contacts = this.getContactsPerson();

    const contactsSync = [];

    if(Array.isArray(contacts)){
      contacts.forEach(contact => {
        if(contact.sync){
          contactsSync.push(contact);
        }
      });
    }

    return contactsSync;
  }

  saveContactSync() {

    if(!this.getContactSync().length){
			return BehaviorSubject.create();
    }

    let url: string = ServiceUrlBuilder.get(UrlType.contact, 'saveContacts');
		return this.http.post(url, { person: this.getContactSync() }).pipe(
			map((response: any) => response.revisions),
			catchError(error => observableThrowError(error)));
  }

  saveContact(person) {
    let url: string = ServiceUrlBuilder.get(UrlType.contact, 'save');
		return this.http.post(url, { person: person }).pipe(
			map((response: any) => response.revisions),
			catchError(error => observableThrowError(error)));
  }

}
