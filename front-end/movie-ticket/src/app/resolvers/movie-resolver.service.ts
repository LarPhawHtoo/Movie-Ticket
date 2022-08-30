import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of, catchError } from 'rxjs';
import { MovieService } from '../services/movie.service';

@Injectable({
  providedIn: 'root'
})
export class MovieResolverService implements Resolve<any>{

  constructor(private movieService: MovieService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> {
    return this.movieService.getMovies().pipe(
      catchError(error => {
        return of(error);
      })
    )
  }
}
