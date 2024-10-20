import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { settings } from '../settings/setting';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserServicesService {
  private apiUrl: string = settings.api;
  constructor(private http: HttpClient) {}
  createNewUser(user: User) {
    return this.http.post(`${this.apiUrl}/User/create-new-user`, user);
  }

  getUserList() {
    return this.http.get<User[]>(`${this.apiUrl}/User/list-user`);
  }

  login(user: { Email: string; Password: string }) {
    return this.http.post<{token: string, Name:string, Role:string}>(`${this.apiUrl}/User/login`, user);
  }
}
