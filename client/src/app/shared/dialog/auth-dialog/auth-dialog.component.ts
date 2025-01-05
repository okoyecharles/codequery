import { Component, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthEndpointsService } from '../../../api/auth-endpoints.service';
import { Subject } from 'rxjs';
import Cookies from "js-cookie";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth-dialog',
  standalone: true,
  imports: [
    MatProgressSpinnerModule
  ],
  templateUrl: './auth-dialog.component.html',
  styleUrl: './auth-dialog.component.scss'
})
export class AuthDialogComponent implements OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  loginMode = true;
  processing: string | null = null;
  error: string | null = null;

  formData = {
    signupName: '',
    signupUsername: '',
    signupPassword: '',
    loginUsername: '',
    loginPassword: '',
  }

  formActions = {
    signup: () => {
      this.processing = 'Creating Account'
      this.error = null;
      const user = {
        name: this.formData.signupName,
        username: this.formData.signupUsername,
        password: this.formData.signupPassword
      }

      if (!user.name.trim() || !user.username.trim() || !user.password.trim()) {
        this.processing = null;
        this.error = 'Please provide valid credentials';
        return;
      }

      this.authService.authSignup(user).subscribe({
        next: (response) => {
          this.processing = null;
          Cookies.set(
            this.auth.cookieData.login.name,
            response.token,
            { expires: this.auth.cookieData.login.expiration }
          );
          this.auth.user = response.user;
          this.closeDialog();
        },
        error: (error) => {
          this.processing = null;
          this.error = error?.error?.message ?? error?.message ?? 'An error occurred';
        }
      });
    },
    login: () => {
      this.processing = 'Logging in'
      this.error = null;
      const user = {
        username: this.formData.loginUsername,
        password: this.formData.loginPassword
      }

      if (!user.username.trim() || !user.password.trim()) {
        this.processing = null;
        this.error = 'Please provide valid credentials';
        return;
      }

      this.authService.authSignin(user).subscribe({
        next: (response) => {
          this.processing = null;
          Cookies.set(
            this.auth.cookieData.login.name,
            response.token,
            { expires: this.auth.cookieData.login.expiration }
          );
          this.auth.user = response.user;
          this.closeDialog();
        },
        error: (error) => {
          this.processing = null;
          this.error = error?.error?.message ?? error?.message ?? 'An error occurred';
        }
      });
    },
  }

  constructor(
    public dialogRef: MatDialogRef<AuthDialogComponent>,
    private authService: AuthEndpointsService,
    private auth: AuthService,
  ) { }

  closeDialog(): void {
    this.dialogRef.close();
  };

  handleInput(event: any, key: keyof typeof this.formData) {
    if (!event.target.value) return;
    this.formData[key] = event.target.value;
  }

  preventDefault(event: Event) {
    event.preventDefault();
  }

  toggleMode() {
    this.loginMode = !this.loginMode;
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
