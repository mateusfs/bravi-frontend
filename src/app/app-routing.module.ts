import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { CadastreComponent } from './cadastre/cadastre.component';
import { ListComponent } from './list/list.component';
import { BracketComponent } from './bracket/bracket.component';
import { ContactListComponent } from './contact/contact-list/contact-list.component';
import { ContactCadastreComponent } from './contact/contact-cadastre/contact-cadastre.component';

const APP_ROUTES: Routes = [
    { path: '', component: ListComponent },
    { path: 'list', component: ListComponent },
    { path: 'cadastre', component: CadastreComponent },
    { path: 'cadastre/:id', component: CadastreComponent },
	{ path: 'bracket', component: BracketComponent },
	{ path: 'contact/list', component: ContactListComponent },
    { path: 'contact/edit', component: ContactCadastreComponent },
    { path: 'contact/edit/:id', component: ContactCadastreComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(
    APP_ROUTES
);