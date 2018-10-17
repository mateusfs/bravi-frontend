import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError as observableThrowError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { SessionService } from '../session/session.service';
import { ServiceUrlBuilder, UrlType } from '../core/url-builder.service';
import { HeaderService } from '../core/header-service';


@Injectable()
export class PersonService {

  constructor(
    private SessionService: SessionService, 
    private http: HttpClient, 
    private header: HeaderService) { }

  public getPersons() {
    return JSON.parse(this.SessionService.getValor('persons'));
  }

  public setPersons(persons) {
    this.SessionService.setValor('persons', JSON.stringify(persons));
  }

  public getPerson() {
    return JSON.parse(this.SessionService.getValor('person'));
  }

  public setPerson(person) {
    this.SessionService.setValor('person', JSON.stringify(person));
  }

  public generateId(){
    return (Math.random().toString(36).toUpperCase()+ Math.random().toString(36).substring(2, 15).toUpperCase()).replace('.', '');
  }

  public getPersonsSync(){
    const persons = this.getPersons();

    if(Array.isArray(persons)){
      const personsSync = [];

      persons.forEach(person => {
        if(person.sync){
          personsSync.push(person);
        }
      });

      return personsSync;
    }
  }

  public savePersonSync() {
    let url: string = ServiceUrlBuilder.get(UrlType.person, 'savePersons');
		return this.http.post(url, { persons: this.getPersonsSync() }, { headers: this.header.getHeaders() }).pipe(
			map((response: any) => response),
			catchError(error => observableThrowError(error)));
  }

  public savePerson(person) {
    let url: string = ServiceUrlBuilder.get(UrlType.person, 'save');
		return this.http.post(url, { person: person }, { headers: this.header.getHeaders() }).pipe(
			map((response: any) => response),
			catchError(error => observableThrowError(error)));
  }

  public getPersonApi(id) {
    let url: string = ServiceUrlBuilder.get(UrlType.person, 'get');
		return this.http.get(url+"/"+id, { headers: this.header.getHeaders() }).pipe(
			map((response: any) => response),
			catchError(error => observableThrowError(error)));
  }

  public deletePerson(id) {
    let url: string = ServiceUrlBuilder.get(UrlType.person, 'delete');
		return this.http.delete(url+"/"+id, { headers: this.header.getHeaders() }).pipe(
			map((response: any) => response),
			catchError(error => observableThrowError(error)));
  }

  public initialPersonsSync(){
    this.savePersonSync().subscribe((response) => {
      if(response){
        console.log('Sync persons');
      }
    });
  }
  

}
