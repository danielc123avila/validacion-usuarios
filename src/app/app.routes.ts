import { Routes } from '@angular/router';
import { SearchFormComponent } from './components/search-form/search-form.component';
import path from 'path';
export const routes: Routes = [

  {path: '', component: SearchFormComponent, pathMatch: 'full', title: 'Buscar Usuario'},

];
