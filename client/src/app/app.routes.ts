import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { SearchComponent } from './features/search/search.component';
import { QueryComponent } from './features/query/query.component';
import { ErrorComponent } from './shared/components/error/error.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'search',
    component: SearchComponent,
    pathMatch: 'full',
  },
  {
    path: 'query/:id',
    component: QueryComponent,
    pathMatch: 'full',
  },
  {
    path: '**',
    component: ErrorComponent,
    pathMatch: 'full',
  }
];
