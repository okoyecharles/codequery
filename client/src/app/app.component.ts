import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthDialogComponent } from './shared/dialog/auth-dialog/auth-dialog.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(
    private dialog: MatDialog,
  ) { }

  openAuthDialog(): void {
    // open auth dialog
    this.dialog.open(AuthDialogComponent, {
    });
  }
}
