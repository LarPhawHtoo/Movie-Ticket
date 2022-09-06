import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry, throwError, catchError } from 'rxjs';
import { User } from '../interfaces/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:8081/api/users';
  changePwdUrl = 'http://localhost:8081/api/users/password-change'
  token = localStorage.getItem("token") || "";
  headerOptions = new HttpHeaders()
    .set('Authorization', `Bearer ${this.token}`);
  options = { headers: this.headerOptions };

  addUser(payload: any) {
    return this.http.post(this.url, payload, this.options)
      .pipe(retry(3), catchError(this.httpErrorHandler));
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url, this.options)
      .pipe(retry(3), catchError(this.httpErrorHandler));
  }

  updateUser(id: string, payload: any) {
    return this.http.put(`${this.url}/${id}`, payload, this.options)
      .pipe(retry(3), catchError(this.httpErrorHandler));
  }

  deleteUser(id: string) {
    return this.http.delete(`${this.url}/${id}`, this.options)
      .pipe(retry(3), catchError(this.httpErrorHandler));
  }

  changePwd(id: string, payload: any) {
    return this.http.post(`${this.changePwdUrl}/${id}`, payload, this.options)
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
