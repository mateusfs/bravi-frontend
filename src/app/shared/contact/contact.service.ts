import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError as observableThrowError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { HeaderService } from '../core/header-service';
import { SessionService } from '../session/session.service';
import { ServiceUrlBuilder, UrlType } from '../core/url-builder.service';
import { PersonService } from '../person/person.service';



@Injectable()
export class ContactService {

  constructor(
    private SessionService: SessionService, 
    private header: HeaderService, 
    private http: HttpClient, 
    private personService: PersonService
  ) { }

  public getContact() {
    return JSON.parse(this.SessionService.getValor('contact'));
  }

  public setContact(contact) {
    this.SessionService.setValor('contact', JSON.stringify(contact));
  }

  public getContactsPerson() {
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

  public getContacts() {
    return JSON.parse(this.SessionService.getValor('contacts'));
  }

  public setContacts(contacts) {
    this.SessionService.setValor('contacts', JSON.stringify(contacts));
  }

  public generateId(){
    return (Math.random().toString(36).toUpperCase()+ Math.random().toString(36).substring(2, 15).toUpperCase()).replace('.', '');
  }

  /**
   *  METHOD CREATED
   *  To synchronize the elements if the backend is experiencing problems and synchronization
   *  solution for offline application
   */
  public getContactSync(){
    const contacts = this.getContactsPerson();

    if(Array.isArray(contacts)){
      const contactsSync = [];

      contacts.forEach(contact => {
        if(contact.sync){
          contactsSync.push(contact);
        }
      });

      return contactsSync;
    }
  }

  public saveContactSync() {
    let url: string = ServiceUrlBuilder.get(UrlType.contact, 'saveContacts');
    return this.http.post(url, { contacts: this.getContactSync() }, 
          { headers: this.header.getHeaders()}).pipe(
			map((response: any) => response),
			catchError(error => observableThrowError(error)));
  }

  public saveContact(contact) {
    let url: string = ServiceUrlBuilder.get(UrlType.contact, 'save');
		return this.http.post(url, { ...contact }, { headers: this.header.getHeaders() }).pipe(
			map((response: any) => response),
			catchError(error => observableThrowError(error)));
  }

  public getContactApi(id) {
    let url: string = ServiceUrlBuilder.get(UrlType.contact, 'get');
		return this.http.get(url+"/"+id, { headers: this.header.getHeaders() }).pipe(
			map((response: any) => response),
			catchError(error => observableThrowError(error)));
  }

  public deleteContact(id) {
    let url: string = ServiceUrlBuilder.get(UrlType.contact, 'delete');
		return this.http.delete(url+"/"+id, { headers: this.header.getHeaders() }).pipe(
			map((response: any) => response),
			catchError(error => observableThrowError(error)));
  }

  public retriveAllContacts(){
    let url: string = ServiceUrlBuilder.get(UrlType.contact, 'all');
		return this.http.get(url, { headers: this.header.getHeaders() }).pipe(
			map((response: any) => response),
			catchError(error => observableThrowError(error)));
  }

  /**
   * Synchronize contacts 
   */
  public initialContactsSync(){
    this.saveContactSync().subscribe((response) => {
      if(response){
        this.setContactSyncOk();
      }
    });
  }

  /**
   * Remove contact 
   */
  public removeContact(id){
    this.deleteContact(id).subscribe((response) => {
      if(response){
        console.log('Sync contacts');
      }
    });
  }

  /**
   * Synchronized 
   */
  private setContactSyncOk(){
    const contacts = this.getContactsPerson();

    if(Array.isArray(contacts)){
      contacts.forEach(contact => {
        contact.sync = false;
      });
    }

    this.setContacts(contacts);
  }

}
