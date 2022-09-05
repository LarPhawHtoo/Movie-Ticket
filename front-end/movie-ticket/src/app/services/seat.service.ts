import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, retry, throwError, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeatService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:8081/api/tickets';
  token = localStorage.getItem("token") || "";
  headerOptions = new HttpHeaders()
    .set('Authorization', `Bearer ${this.token}`);
  options = { headers: this.headerOptions };

  getSeats(cinemaId: any, payload: any) {
    return this.http.post(`${this.url}/${cinemaId}`, payload, this.options)
      .pipe(retry(3), catchError(this.httpErrorHandler));
  }

  //updateSeat(seatNumber: any) {
  //  return this.http.post(this.url)
  //}

  private httpErrorHandler(error: HttpErrorResponse) {
    if (error.error instanceof HttpErrorResponse) {
      console.error("A client side error occured. The error message is " + error.message);
    } else {
      console.error("A server side error occured. The error message is " + error.message);
    }
    return throwError("Error occured.");
  }
}
