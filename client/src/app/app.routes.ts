import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { SearchComponent } from './features/search/search.component';
import { QueryComponent } from './features/query/query.component';
import { ErrorComponent } from './shared/components/error/error.component';
import { homeResolver } from './features/home/home.resolver';
import { queryResolver } from './features/query/query.resolver';

export const routes: Routes = [
  {
    title: 'CodeQuery',
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    title: 'Home - CodeQuery',
    path: 'home',
    component: HomeComponent,
    pathMatch: 'full',
    resolve: { data: homeResolver }
  },
  {
    title: 'Search - CodeQuery',
    path: 'search',
    component: SearchComponent,
    pathMatch: 'full',
  },
  {
    title: 'Query - CodeQuery',
    path: 'query/:id',
    component: QueryComponent,
    pathMatch: 'full',
    resolve: { data: queryResolver }
  },
  {
    path: '**',
    component: ErrorComponent,
    pathMatch: 'full',
  }
];
