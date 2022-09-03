import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry, delay, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardserviceService {
  constructor(private http: HttpClient) { }

  url = 'http://localhost:8081/api/tickets/dashboard';
  token = localStorage.getItem("token") || '';
  headerOptions = new HttpHeaders()
    .set('Authorization', `Bearer ${this.token}`);
  options = { headers: this.headerOptions };
  getDashboard(): Observable<any> {
    return this.http.get<any>(this.url, this.options)
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
