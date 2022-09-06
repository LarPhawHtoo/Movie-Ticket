import { Injectable } from '@angular/core';
import { Observable, retry, catchError, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:8081/api/movies';
  nowShowingUrl = 'http://localhost:8081/api/movies/now-showing';
  token = localStorage.getItem("token") || '';
  headerOptions = new HttpHeaders()
    .set('Authorization', `Bearer ${this.token}`);
  options = { headers: this.headerOptions };

  createMovie(data: any) {
    return this.http.post(this.url, data, this.options)
      .pipe(retry(3), delay(1000), catchError(this.httpErrorHandler));
  };

  getNowShowingMovies(): Observable<any> {
    return this.http.get<any>(this.nowShowingUrl, this.options)
      .pipe(retry(3), catchError(this.httpErrorHandler));
  }

  getMovies(): Observable<any> {
    return this.http.get<any>(this.url, this.options)
      .pipe(retry(3), delay(1000), catchError(this.httpErrorHandler));
  }

  updateMovie(movieId: any, payload: any) {
    return this.http.put(`${this.url}/` + movieId, payload, this.options)
      .pipe(retry(3), delay(1000), catchError(this.httpErrorHandler));
  }

  deleteMovie(movieid: any) {
    return this.http.delete(`${this.url}/${movieid}`, this.options)
      .pipe(retry(3), delay(1000), catchError(this.httpErrorHandler));
  }

  private httpErrorHandler(error: HttpErrorResponse) {
    if (error.error instanceof HttpErrorResponse) {
      console.error("A client side error occured. The error message is " + error.message);
    } else {
      console.error("A server side error occured. The error message is " + error.message);
    }
    return throwError("Error occured.");
  }
}
