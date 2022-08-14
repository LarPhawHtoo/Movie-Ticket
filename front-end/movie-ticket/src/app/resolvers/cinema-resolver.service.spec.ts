import { TestBed } from '@angular/core/testing';

import { CinemaResolverService } from './cinema-resolver.service';

describe('CinemaResolverService', () => {
  let service: CinemaResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CinemaResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
