import { TestBed } from '@angular/core/testing';

import { FetchUserResolverService } from './fetch-user-resolver.service';

describe('FetchUserResolverService', () => {
  let service: FetchUserResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchUserResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
