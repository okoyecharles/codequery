import { TestBed } from '@angular/core/testing';

import { AuthEndpointsService } from './auth-endpoints.service';

describe('AuthEndpointsService', () => {
  let service: AuthEndpointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthEndpointsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
