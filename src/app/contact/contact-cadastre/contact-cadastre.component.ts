import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Contact } from '../../shared/contact/contact';
import { ContactService } from '../../shared/contact/contact.service';

@Component({
  selector: 'app-contact-cadastre',
  templateUrl: './contact-cadastre.component.html',
  styleUrls: ['./contact-cadastre.component.css']
})

export class ContactCadastreComponent implements OnInit {

  public contact = new Contact;
  public formulario: FormGroup;
  public formularioSenha: FormGroup;

  constructor(
    private router: Router, 
    private contactService: ContactService) { }

  ngOnInit() {

    if (this.contactService.getContact()) {
      this.contact = this.contactService.getContact();
    }

    this.contactService.saveContactSync().subscribe((response) => {
      if(response){
        console.log('sync');
      }
    });
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
        Validators.minLength(4)
      ]),
      'phone': new FormControl(this.contact.phone, [
        Validators.required,
      ]),
      'cellphone': new FormControl(this.contact.cellphone, [
        Validators.required,
      ])
    });

    if (this.formulario.status === 'VALID') {
      this.contact.sync = true;

      this.contactService.saveContact(this.contact).subscribe((response) => {
				if(response){
          this.contact.sync = false;
        }
			},
      error => {
        this.setContactSession();
      });

      this.router.navigate(['/contact/list/']);
    }
  }

  back(){
    this.router.navigate(['/contact/list/']);
  }

  public disabledContact(){
    return !(this.contact.email && this.contact.phone && this.contact.cellphone);
  }

  private setContactSession(){

    let contacts = this.contactService.getContactsPerson();
    
    if(!contacts) contacts = [];
    
    if (!contacts.find(item => item.id == this.contact.id)) {
      contacts.push(this.contact)
    }

    if(Array.isArray(contacts)){
      this.contactService.setContactsPerson(contacts);
    }
  }
  
  public isValidade(name){
    if(!this.formulario) return false;
    return this.formulario.controls[name].status === 'INVALID';
  }

  public calcel(){
    this.router.navigate(['/cadastre']);
  }

  
}
