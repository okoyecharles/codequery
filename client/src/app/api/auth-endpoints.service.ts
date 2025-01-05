import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './api.types';

type AuthUserResponse = {
  user: User,
  token: string,
}

@Injectable({
  providedIn: 'root'
})
export class AuthEndpointsService {

  constructor(
    private http: HttpClient
  ) { }

  authSignin(user: { username: string, password: string }) {
    return this.http.post<AuthUserResponse>('users/signin', user);
  }

  authSignup(user: { name: string, username: string, password: string }) {
    return this.http.post<AuthUserResponse>('users/signup', user);
  }

  // protected routes (require authentication)

  authValidate() {
    return this.http.post<AuthUserResponse>('users/validate', {}, { withCredentials: true });
  }

  authSignout() {
    return this.http.post('users/signout', {}, { withCredentials: true });
  }
}
