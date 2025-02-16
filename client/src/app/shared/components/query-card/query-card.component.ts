import { Component, Input } from '@angular/core';
import { Query } from '../../../api/api.types';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { EditQueryDialogComponent } from '../../dialog/edit-query-dialog/edit-query-dialog.component';
import { DeleteQueryDialogComponent } from '../../dialog/delete-query-dialog/delete-query-dialog.component';
import { QueriesService } from '../../services/queries.service';

@Component({
  selector: 'app-query-card',
  standalone: true,
  imports: [DatePipe, MatIconModule, RouterModule, MatMenuModule],
  templateUrl: './query-card.component.html',
  styleUrl: './query-card.component.scss'
})
export class QueryCardComponent {
  @Input() query!: Query;

  constructor(
    private auth: AuthService,
    private dialog: MatDialog,
    private queries: QueriesService,
  ) { }

  isOwner() {
    return this.query.user?._id === this.auth.user?._id;
  }

  openEditQueryDialog() {
    const dialog = this.dialog.open(EditQueryDialogComponent, {
      data: { query: this.query }
    });
    dialog.afterClosed().subscribe((result: any) => {
      if (result) {
        // this.query.question = result.question.question;
        this.queries.homeQueries = this.queries.homeQueries.map((query) => {
          if (query._id === result.question._id) {
            return result.question;
          }
          return query;
        });
        this.queries.searchQueries = this.queries.searchQueries.map((query) => {
          if (query._id === result.question._id) {
            return result.question;
          }
          return query;
        }
        );
      }
    });
  }

  openDeleteQueryDialog() {
    const dialog = this.dialog.open(DeleteQueryDialogComponent, {
      data: { query: this.query }
    });
    dialog.afterClosed().subscribe(() => {
      // delete query
      this.queries.homeQueries = this.queries.homeQueries.filter((query) => query._id !== this.query._id);
      this.queries.searchQueries = this.queries.searchQueries.filter((query) => query._id !== this.query._id);
    });
  }
}
