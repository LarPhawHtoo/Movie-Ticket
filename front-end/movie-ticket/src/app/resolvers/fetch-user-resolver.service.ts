import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs';

import { FetchUserService } from '../services/fetch-user.service';

@Injectable({
  providedIn: 'root'
})
export class FetchUserResolverService implements Resolve<any> {

  constructor(private fetchUserService: FetchUserService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.fetchUserService.getUsers().pipe(
      catchError(error => {
        return of(error);
      })
    )
  }
}
