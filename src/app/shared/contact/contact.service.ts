import { Injectable } from '@angular/core';
import { SessionService } from '../session/session.service';
import { ServiceUrlBuilder, UrlType } from '../core/url-builder.service';
import { HttpClient } from '@angular/common/http';

import { throwError as observableThrowError, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class ContactService {

  constructor(private SessionService: SessionService, private http: HttpClient) { }

  getContact() {
    return JSON.parse(this.SessionService.getValor('contact'));
  }

  setContact(contact) {
    this.SessionService.setValor('contact', JSON.stringify(contact));
  }

  getContactsPerson() {
    return JSON.parse(this.SessionService.getValor('contacts'));
  }

  setContactsPerson(contacts) {
    this.SessionService.setValor('contacts', JSON.stringify(contacts));
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

    let url: string = ServiceUrlBuilder.get(UrlType.contact, 'save');
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
