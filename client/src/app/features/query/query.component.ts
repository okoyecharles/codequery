import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QueryDetailed } from '../../api/api.types';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AnswerCardComponent } from '../../shared/components/answer-card/answer-card.component';

@Component({
  selector: 'app-query',
  standalone: true,
  imports: [DatePipe, MatIconModule, AnswerCardComponent],
  templateUrl: './query.component.html',
  styleUrl: './query.component.scss'
})
export class QueryComponent {
  query!: QueryDetailed;

  constructor(
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ data }) => {
      this.query = data.question;
    });
  }
}
