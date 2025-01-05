import { validateUser } from './../../../../../server/src/controllers/userController';
import { Injectable } from '@angular/core';
import { User } from '../../api/api.types';
import { AuthEndpointsService } from '../../api/auth-endpoints.service';
import { BehaviorSubject } from 'rxjs';
import Cookies from 'js-cookie';
import { tokenName } from '../../api/api.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user!: User;
  validating$ = new BehaviorSubject<boolean>(true);
  cookieData = {
    // in days
    login: {
      name: tokenName,
      expiration: 7,
    },
  }

  constructor(
    private authService: AuthEndpointsService,
  ) { }

  validateUser() {
    this.authService.authValidate().subscribe({
      next: (res) => {
        this.user = res.user;
        this.validating$.next(false);
      },
      error: () => {
        this.validating$.next(false);
      }
    })
  };

  logout() {
    Cookies.remove(this.cookieData.login.name);
    this.user = null as any;
    this.authService.authSignout();
  };
}
