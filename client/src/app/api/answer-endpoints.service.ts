import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getAPIRoute } from './api.config';

@Injectable({
  providedIn: 'root'
})
export class AnswerEndpointsService {

  constructor(
    private http: HttpClient
  ) { }

  answerAllAnswers(queryId: string) {
    return this.http.get(getAPIRoute(`questions/${queryId}/answers`));
  }

  // protected routes (require authentication)

  answerCreateAnswer(queryId: string, answer: any) {
    return this.http.post(getAPIRoute(`questions/${queryId}/answers`), answer, { withCredentials: true });
  }

  answerDeleteAnswer(queryId: string, answerId: string) {
    return this.http.delete(getAPIRoute(`questions/${queryId}/answers/${answerId}`), { withCredentials: true });
  }

  answerUpdateAnswer(queryId: string, answerId: string, answer: any) {
    return this.http.put(getAPIRoute(`questions/${queryId}/answers/${answerId}`), answer, { withCredentials: true });
  }
}
