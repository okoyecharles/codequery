import { login } from './../../../../../../server/src/controllers/userController';
import { Component, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthEndpointsService } from '../../../api/auth-endpoints.service';
import { Subject } from 'rxjs';

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
      console.log('signup', this.formData);
      this.processing = 'Creating Account'
      this.error = null;
    },
    login: () => {
      console.log('login', this.formData);
      this.processing = 'Logging in'
      this.error = null;
      const user = {
        username: this.formData.loginUsername,
        password: this.formData.loginPassword
      }
      
      if (!user.username.trim() || !user.password.trim()) {
        this.processing = null;
        this.error = 'Please provide a valid username and password';
        return;
      }

      this.authService.authSignin(user).subscribe(
        (response) => {
          console.log(response);
          this.processing = null;
        },
        (error) => {
          this.processing = null;
          this.error = error?.message ?? error?.error?.message ?? 'An error occurred';
        }
      );
    },
  }

  constructor(
    public dialogRef: MatDialogRef<AuthDialogComponent>,
    private authService: AuthEndpointsService
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
