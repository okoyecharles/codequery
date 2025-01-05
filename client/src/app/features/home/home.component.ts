import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QueryCardComponent } from "../../shared/components/query-card/query-card.component";
import { Query } from '../../api/api.types';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../shared/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AskQueryDialogComponent } from '../../shared/dialog/ask-query-dialog/ask-query-dialog.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [QueryCardComponent, MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  queries: Array<Query> = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    public auth: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ data }) => {
      this.queries = data.questions;
    });
  }

  openAskQueryDialog() {
    const dialog = this.dialog.open(AskQueryDialogComponent);
    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.queries.unshift(result.question);
      }
    });
  }
}
