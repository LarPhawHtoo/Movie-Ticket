import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of, catchError } from 'rxjs';
import { TicketService } from '../services/ticket.service';

@Injectable({
  providedIn: 'root'
})
export class TicketResolverService implements Resolve<any> {

  constructor(private ticketService: TicketService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> {
    return this.ticketService.getTickets().pipe(
      catchError(error => {
        return of(error);
      })
    )
  }
}
