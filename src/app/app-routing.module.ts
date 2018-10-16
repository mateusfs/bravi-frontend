import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { StartComponent } from './start/start.component';
import { ListComponent } from './list/list.component';
import { BracketComponent } from './bracket/bracket.component';

const APP_ROUTES: Routes = [
    { path: '', component: StartComponent },
    { path: 'bracket', component: BracketComponent },
    { path: 'start', component: StartComponent },
    { path: 'list', component: ListComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(
    APP_ROUTES
);