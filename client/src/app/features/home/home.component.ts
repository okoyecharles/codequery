import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QueryCardComponent } from "../../shared/components/query-card/query-card.component";
import { Query } from '../../api/api.types';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [QueryCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  queries: Array<Query> = [];
  constructor(
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ data }) => {
      this.queries = data.questions;
    });
  }
}
