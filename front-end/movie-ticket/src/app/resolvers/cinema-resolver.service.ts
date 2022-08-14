import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of, catchError } from 'rxjs';

import { CinemaService } from '../services/cinema.service';


@Injectable({
  providedIn: 'root'
})
export class CinemaResolverService implements Resolve<any> {

  constructor(private cinemaService: CinemaService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> {
    return this.cinemaService.getCinemas().pipe(
      catchError(error => {
        return of(error);
      })
    )
  }
}
