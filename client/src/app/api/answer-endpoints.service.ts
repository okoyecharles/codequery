import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { generateAuthHeaders, getAPIRoute } from './api.config';
import { QueryDetailed } from './api.types';

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
    return this.http.post(getAPIRoute(`questions/${queryId}/answers`), answer, {
      headers: generateAuthHeaders(),
    });
  }

  answerGetAIAnswer(queryId: string) {
    return this.http.put<{ question: QueryDetailed }>(getAPIRoute(`questions/${queryId}/answers/intelligent`), {}, {
      headers: generateAuthHeaders(),
    });
  }

  answerDeleteAnswer(queryId: string, answerId: string) {
    return this.http.delete(getAPIRoute(`questions/${queryId}/answers/${answerId}`), {
      headers: generateAuthHeaders(),
    });
  }

  answerUpdateAnswer(queryId: string, answerId: string, answer: any) {
    return this.http.put(getAPIRoute(`questions/${queryId}/answers/${answerId}`), answer, {
      headers: generateAuthHeaders(),
    });
  }
}
