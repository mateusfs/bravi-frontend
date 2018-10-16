import { Injectable } from '@angular/core';
import { SessionService } from '../session/session.service';
import { ServiceUrlBuilder, UrlType } from '../core/url-builder.service';
import { HttpClient } from '@angular/common/http';

import { throwError as observableThrowError, Observable, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class PersonService {

  constructor(private SessionService: SessionService, private http: HttpClient) { }

  getPersons() {
    return JSON.parse(this.SessionService.getValor('persons'));
  }

  setPersons(persons) {
    this.SessionService.setValor('persons', JSON.stringify(persons));
  }

  getPerson() {
    return JSON.parse(this.SessionService.getValor('person'));
  }

  setPerson(person) {
    this.SessionService.setValor('person', JSON.stringify(person));
  }

  getPersonsSync(){
    const persons = this.getPersons();

    const personsSync = [];

    if(Array.isArray(persons)){
      persons.forEach(person => {
        if(person.sync){
          personsSync.push(person);
        }
      });
    }

    return personsSync;
  }

  savePersonSync() {

    if(!this.getPersonsSync().length){
			return BehaviorSubject.create();
    }
    
    let url: string = ServiceUrlBuilder.get(UrlType.person, 'save');
		return this.http.post(url, { person: this.getPersonsSync() }).pipe(
			map((response: any) => response.revisions),
			catchError(error => observableThrowError(error)));
  }

  savePerson(person) {
    let url: string = ServiceUrlBuilder.get(UrlType.person, 'save');
		return this.http.post(url, { person: person }).pipe(
			map((response: any) => response.revisions),
			catchError(error => observableThrowError(error)));
  }

  

}
