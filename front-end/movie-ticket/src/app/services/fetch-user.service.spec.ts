import { TestBed } from '@angular/core/testing';

import { FetchUserService } from './fetch-user.service';

describe('FetchUserService', () => {
  let service: FetchUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
