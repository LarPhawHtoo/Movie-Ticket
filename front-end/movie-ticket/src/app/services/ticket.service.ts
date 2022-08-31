import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, retry, throwError, catchError } from 'rxjs';
import { Ticket } from '../interfaces/ticket.model';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:8081/api/tickets';
  token = localStorage.getItem("token") || "";
  headerOptions = new HttpHeaders()
    .set('Authorization', `Bearer ${this.token}`);
  options = { headers: this.headerOptions };

  addTicket(payload: any) {
    return this.http.post(this.url, payload, this.options)
      .pipe(retry(3), catchError(this.httpErrorHandler));
  }

  getTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.url, this.options)
      .pipe(retry(3), catchError(this.httpErrorHandler));
  }

  updateTicket(id: string, payload: any) {
    return this.http.put(`${this.url}/${id}`, payload, this.options)
      .pipe(retry(3), catchError(this.httpErrorHandler));
  }

  deleteTicket(id: string) {
    return this.http.delete(`${this.url}/${id}`, this.options)
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
