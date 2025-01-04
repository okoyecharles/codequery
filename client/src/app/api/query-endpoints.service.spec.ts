import { TestBed } from '@angular/core/testing';

import { QueryEndpointsService } from './query-endpoints.service';

describe('QueryEndpointsService', () => {
  let service: QueryEndpointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QueryEndpointsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
