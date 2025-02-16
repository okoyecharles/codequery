import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QueryDetailed } from '../../api/api.types';
import { CommonModule, DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AnswerCardComponent } from '../../shared/components/answer-card/answer-card.component';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AnswerEndpointsService } from '../../api/answer-endpoints.service';
import moment from 'moment';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-query',
  standalone: true,
  imports: [DatePipe, MatIconModule, AnswerCardComponent, CommonModule, MatProgressSpinnerModule, MatIconModule],
  templateUrl: './query.component.html',
  styleUrl: './query.component.scss'
})
export class QueryComponent implements OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  query!: QueryDetailed;
  MAX_ANSWER_LENGTH = 250;
  queryAnswer$ = new BehaviorSubject<string>("");
  processing = false;
  intelligentAnswerProcessing = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private answerService: AnswerEndpointsService,
    public auth: AuthService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ data }) => {
      this.query = data.question;
    });
  }

  generateIntelligentAnswer() {
    this.intelligentAnswerProcessing = true;
    this.answerService.answerGetAIAnswer(this.query._id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.query = data.question;
          this.intelligentAnswerProcessing = false;
        },
        error: (error) => {
          console.error(error);
          this.intelligentAnswerProcessing = false;
        }
      })
  }

  handleInput(event: any) {
    this.queryAnswer$.next(event.target.value);
  }

  answerQuestion(event: Event) {
    event.preventDefault();
    this.processing = true;
    this.answerService.answerCreateAnswer(this.query._id, { answer: this.queryAnswer$.getValue() })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.query = data.question;
          this.processing = false;
          this.queryAnswer$.next("");
        },
        error: (error) => {
          console.error(error);
          this.processing = false;
        }
      })
  }

  sortedAnswers() {
    return this.query.answers.sort((a, b) => moment(b.createdAt).diff(moment(a.createdAt)));
  }

  ngOnDestroy(): void {
      this.destroy$.next(true);
      this.destroy$.complete();
  }
}
