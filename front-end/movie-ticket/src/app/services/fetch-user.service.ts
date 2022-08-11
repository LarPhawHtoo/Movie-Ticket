import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.model';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FetchUserService {

  constructor(private http: HttpClient) { }

  private url = 'http://localhost:8081/api/users';

  //private token = localStorage.getItem('token') || '';

  private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IiQyYiQxMiRDZXg5Wi5EQkNDaVY1d1VXU2JjNFplQzJlU0t5a2I0SE50Ulc4c1djNnpmNE80R3JMRklHZSIsImlkIjoiJDJiJDEyJC5GYmtJR0tqbVBaNEp0dG5xY0FkeHUvdlFsLkRFVmRMU2ZMQmVyc0t1NktwbkNHYjA4VXVtIiwiaWF0IjoxNjYwMTE4MDc2LCJleHAiOjE2NjAyMDQ0NzZ9.kBSmB4jMvcP-c_CBARATJP36IvdmYpcrii6N3n_iy4U';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }).set('Authorization', `Bearer ${this.token}`)
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url, this.httpOptions)
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
