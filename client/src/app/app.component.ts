import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthDialogComponent } from './shared/dialog/auth-dialog/auth-dialog.component';
import { AuthService } from './shared/services/auth.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private dialog: MatDialog,
    public auth: AuthService,
  ) { }

  ngOnInit(): void {
      this.auth.validateUser();
  }

  openAuthDialog(): void {
    // open auth dialog
    this.dialog.open(AuthDialogComponent, {
    });
  }

  ngOnDestroy(): void {
      this.destroy$.next(true);
      this.destroy$.unsubscribe();
  }
}
