import { Injectable } from '@angular/core';
import { Observable, of, retry, catchError, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Cinema } from '../interfaces/cinema.model';

@Injectable({
  providedIn: 'root'
})
export class CinemaService {

  url = 'http://localhost:8081/api/cinemas';

  createCinema(data: any) {
    const token = localStorage.getItem("token") || '';
    const headerOptions = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);
    const options = { headers: headerOptions };
    const body =   {
      'code': `${data.code}`,
      'name': `${data.name}`,
      'location': `${data.location}`,
      'time': `${data.time}`,
      'date': `${data.date}`
    };

    this.http.post(this.url, body, options)
      .pipe(retry(3), delay(1000), catchError(this.httpErrorHandler));
  };

  getCinemas(): Observable<Cinema[]> {
    const token = localStorage.getItem("token") || '';
    const headerOptions = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);
    const options = { headers: headerOptions };

    return this.http.get<Cinema[]>(this.url, options)
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

  constructor(private http: HttpClient) { }
}