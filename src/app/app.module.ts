import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { routing } from './app-routing.module';
import { TextMaskModule } from 'angular2-text-mask';
import { AccordionModule } from 'primeng/accordion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';
import { InputMaskModule } from 'primeng/inputmask';

import { AppComponent } from './app.component';
import { BracketComponent } from './bracket/bracket.component';
import { ListComponent } from './list/list.component';
import { StartComponent } from './start/start.component';

import { PersonService } from './shared/person/person.service';
import { SessionService } from './shared/session/session.service';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ListComponent,
    StartComponent,
    BracketComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    routing,
    InputMaskModule,
    FormsModule,
    HttpModule,
    TextMaskModule,
    AccordionModule,
    BrowserAnimationsModule,
    ConfirmDialogModule,
    InputTextModule,
    ButtonModule
  ],
  providers: [
    PersonService,
    SessionService,
    ConfirmationService,
    HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
