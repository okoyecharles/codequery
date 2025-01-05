import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './api.types';
import { generateAuthHeaders, getAPIRoute } from './api.config';

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
    return this.http.post<AuthUserResponse>(getAPIRoute('users/signin'), user);
  }

  authSignup(user: { name: string, username: string, password: string }) {
    return this.http.post<AuthUserResponse>(getAPIRoute('users/signup'), user);
  }

  // protected routes (require authentication)

  authValidate() {
    return this.http.post<AuthUserResponse>(getAPIRoute('users/validate'), {}, {
      headers: generateAuthHeaders(),
    });
  }

  authSignout() {
    return this.http.post('users/signout', {}, {
      headers: generateAuthHeaders(),
    });
  }
}
