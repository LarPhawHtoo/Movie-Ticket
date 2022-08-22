import { Injectable } from '@angular/core';
import { Observable, retry, catchError, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Cinema } from '../interfaces/cinema.model';

@Injectable({
  providedIn: 'root'
})
export class CinemaService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:8081/api/cinemas';
  token = localStorage.getItem("token") || '';
  headerOptions = new HttpHeaders()
    .set('Authorization', `Bearer ${this.token}`);
  options = { headers: this.headerOptions };

  createCinema(name: string) {
    const body = { "name": name };
    return this.http.post(this.url, body, this.options)
      .pipe(retry(3), catchError(this.httpErrorHandler));
  };

  getCinemas(): Observable<Cinema[]> {
    return this.http.get<Cinema[]>(this.url, this.options)
      .pipe(retry(3), catchError(this.httpErrorHandler));
  }

  updateCinema(cinemaId: any, payload: any) {
    return this.http.put(`${this.url}/${cinemaId}`, payload, this.options)
      .pipe(retry(3), catchError(this.httpErrorHandler));
  }

  deleteCinema(cinemaId: any) {
    return this.http.delete(`${this.url}/${cinemaId}`, this.options)
      .pipe(retry(3), catchError(this.httpErrorHandler));
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
