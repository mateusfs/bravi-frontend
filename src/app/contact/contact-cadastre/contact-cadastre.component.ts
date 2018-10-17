import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Contact } from '../../shared/contact/contact';
import { ContactService } from '../../shared/contact/contact.service';
import { PersonService } from '../../shared/person/person.service';
import { Person } from '../../shared/person/person';

@Component({
  selector: 'app-contact-cadastre',
  templateUrl: './contact-cadastre.component.html',
  styleUrls: ['./contact-cadastre.component.css']
})

export class ContactCadastreComponent implements OnInit {

  public person = new Person();
  public contact = new Contact;
  public formulario: FormGroup;
  public formularioSenha: FormGroup;

  public phoneMask = ['(', /\d/, /\d/, ')', /\d/, /\d/, /\d/,  /\d/,'-', /\d/, /\d/, /\d/, /\d/];
  public cellphoneMask = ['(', /\d/, /\d/, ')', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  constructor(
    private router: Router, 
    private contactService: ContactService,
    private personService: PersonService) { }

  ngOnInit() {

    if (this.personService.getPerson()) {
      this.person = this.personService.getPerson();
    }

    if (this.contactService.getContact()) {
      this.contact = this.contactService.getContact();
    }

    if(!this.contact || !this.person){
      this.router.navigate(['/cadastre']);
    }

    if(!this.contactService.getContactSync()){
			this.contactService.initialContactsSync();
    }
  }

  onlyLetter(event: any) {

    const pattern = /^[a-zA-Z]/;
    const inputChar = String.fromCharCode(event.charCode);

    if (event.keyCode == '32') {
      return true;
    }

    if (!pattern.test(inputChar)) {
      return false;
    }

    return true;
  }

  onlyNumber(event: any) {

    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);

    if (event.keyCode == '9' || event.keyCode == '8') {
      return true;
    }

    if (!pattern.test(inputChar)) {
      return false;
    }
  }
 
  save(){
    this.formulario = new FormGroup({
      'email': new FormControl(this.contact.email, [
        Validators.required,
        Validators.email,
      ]),
      'phone': new FormControl(this.contact.phone, [
        Validators.minLength(7),
      ]),
      'cellphone': new FormControl(this.contact.cellphone, [
        Validators.minLength(8),
      ])
    });

    if (this.formulario.status === 'VALID') {

      this.contact.person = this.person.id;

      if(!this.contact.id){
        this.contact.id = this.contactService.generateId();
        this.contact.sync = true;
        this.setContactSession();
      }

      this.contactService.saveContact(this.contact).subscribe((response) => {
				if(response){
          this.contact.sync = false;
          this.setContactSession();
        }
			},
      error => {
        this.setContactSession();
      });
    }
  }

  back(){
    this.router.navigate(['/contact/list/']);
  }

  public disabledContact(){
    return !(this.contact.email);
  }

  private setContactSession(){

    let contacts = this.contactService.getContacts();
    
    if(!contacts) contacts = [];
    
    contacts.forEach((item, index) => {
      if(item.id == this.contact.id){
        contacts.splice(index, 1);
        contacts.push(this.contact);
      }
    });

    if(!contacts.find(item => item.id == this.contact.id)){
      contacts.push(this.contact);
    }

    if(Array.isArray(contacts)){
      this.contactService.setContacts(contacts);
    }

    this.router.navigate(['/contact/list/']);
  }
  
  public isValidade(name){
    if(!this.formulario) return false;
    return this.formulario.controls[name].status === 'INVALID';
  }

  public calcel(){
    this.router.navigate(['/cadastre']);
  }

  
  
}
