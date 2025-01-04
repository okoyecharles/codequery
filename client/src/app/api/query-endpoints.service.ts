import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getAPIRoute } from './api.config';

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
    return this.http.post(getAPIRoute('questions'), query, { withCredentials: true });
  }

  queryUpdateQuery(queryId: string, query: any) {
    return this.http.put(getAPIRoute(`questions/${queryId}`), query, { withCredentials: true });
  }

  queryDeleteQuery(queryId: string) {
    return this.http.delete(getAPIRoute(`questions/${queryId}`), { withCredentials: true });
  }
}
