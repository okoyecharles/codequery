import { TestBed } from '@angular/core/testing';

import { AnswerEndpointsService } from './answer-endpoints.service';

describe('AnswerEndpointsService', () => {
  let service: AnswerEndpointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnswerEndpointsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
