import { Injectable } from '@angular/core';
import { SessionService } from '../session/session.service';

@Injectable()
export class PersonService {

  constructor(private SessionService: SessionService) { }

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
}
