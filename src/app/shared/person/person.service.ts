import { Injectable } from '@angular/core';
import { throwError as observableThrowError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { SessionService } from '../session/session.service';
import { ServiceUrlBuilder, UrlType } from '../core/url-builder.service';
import { HttpClient } from '../core/http-client';


@Injectable()
export class PersonService {

  constructor(private SessionService: SessionService, private http: HttpClient) { }

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
		return this.http.post(url, { person: this.getPersonsSync() }).pipe(
			map((response: any) => response.revisions),
			catchError(error => observableThrowError(error)));
  }

  public savePerson(person) {
    let url: string = ServiceUrlBuilder.get(UrlType.person, 'save');
		return this.http.post(url, { person: person }).pipe(
			map((response: any) => response.revisions),
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
