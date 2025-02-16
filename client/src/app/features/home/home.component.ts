import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QueryCardComponent } from "../../shared/components/query-card/query-card.component";
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../shared/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AskQueryDialogComponent } from '../../shared/dialog/ask-query-dialog/ask-query-dialog.component';
import { QueriesService } from '../../shared/services/queries.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [QueryCardComponent, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    public auth: AuthService,
    private dialog: MatDialog,
    public queries: QueriesService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ data }) => {
      this.queries.homeQueries = data.questions;
    });
  }

  openAskQueryDialog() {
    const dialog = this.dialog.open(AskQueryDialogComponent);
    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.queries.homeQueries.unshift(result.question);
      }
    });
  }
}
