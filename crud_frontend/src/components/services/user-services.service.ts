import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { settings } from '../settings/setting';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class UserServicesService {
  private apiUrl: string = settings.api;

  constructor(private http: HttpClient) {}

  createNewUser(user: User) {
    return this.http.post(`${this.apiUrl}/User/create-new-user`, user)
      .pipe(
        catchError(this.handleError)
      );
  }

  getUserList() {
    return this.http.get<User[]>(`${this.apiUrl}/User/list-user`)
      .pipe(
        catchError(this.handleError)
      );
  }

  login(user: { Email: string; Password: string }) {
    return this.http.post<{token: string, Name:string, Role:string}>(`${this.apiUrl}/User/login`, user)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
