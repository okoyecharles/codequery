import { Injectable } from '@angular/core';
import { Query } from '../../api/api.types';

@Injectable({
  providedIn: 'root'
})
export class QueriesService {
  homeQueries: Array<Query> = [];
  searchQueries: Array<Query> = [];

  constructor() { }
}
