import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { generateAuthHeaders, getAPIRoute } from './api.config';
import { QueryDetailed } from './api.types';

@Injectable({
  providedIn: 'root'
})
export class QueryEndpointsService {

  constructor(
    private http: HttpClient
  ) { }

  queryAllQueries() {
    return this.http.get(getAPIRoute('questions'));
  }

  querySearchQueries(searchQuery: string) {
    return this.http.get(getAPIRoute(`questions/search?q=${searchQuery}`));
  }

  querySingleQuery(queryId: string) {
    return this.http.get(getAPIRoute(`questions/${queryId}`));
  }

  // protected routes (require authentication)

  queryCreateQuery(query: any) {
    return this.http.post<{ question: QueryDetailed }>(getAPIRoute('questions'), query, {
      headers: generateAuthHeaders(),
    });
  }

  queryUpdateQuery(queryId: string, query: any) {
    return this.http.put<{ question: QueryDetailed }>(getAPIRoute(`questions/${queryId}`), query, {
      headers: generateAuthHeaders(),
    });
  }

  queryDeleteQuery(queryId: string) {
    return this.http.delete(getAPIRoute(`questions/${queryId}`), {
      headers: generateAuthHeaders(),
    });
  }
}
