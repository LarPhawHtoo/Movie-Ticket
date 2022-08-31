import { TestBed } from '@angular/core/testing';

import { TicketResolverService } from './ticket-resolver.service';

describe('TicketResolverService', () => {
  let service: TicketResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
