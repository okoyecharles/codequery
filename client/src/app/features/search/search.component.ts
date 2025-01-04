import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BehaviorSubject, debounceTime, finalize, Subject, takeUntil } from 'rxjs';
import { Query } from '../../api/api.types';
import { QueryEndpointsService } from '../../api/query-endpoints.service';
import { QueryCardComponent } from '../../shared/components/query-card/query-card.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [MatIconModule, QueryCardComponent, MatProgressSpinnerModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  searching$ = new BehaviorSubject<boolean>(false);
  searchedQuery$ = new BehaviorSubject<string>('');
  searchResults: Array<Query> = [];

  constructor(
    private queryService: QueryEndpointsService,
  ) { }

  ngOnInit(): void {
    this.subscribeSearchQueries();
  }

  handleInput(event: any) {
    if (event.target.value) this.searching$.next(true);
    this.searchedQuery$.next(event.target.value);
  }

  subscribeSearchQueries() {
    this.searchedQuery$.pipe(takeUntil(this.destroy$), debounceTime(1000)).subscribe((search) => {
      const trimmedSearch = search.trim();
      if (trimmedSearch.length > 0) {
        this.queryService.querySearchQueries(trimmedSearch).pipe(
          takeUntil(this.destroy$),
          finalize(() => {
            this.searching$.next(false);
          }),

        ).subscribe({
          next: (data: any) => {
            this.searchResults = data.questions;
          },
          error: (error) => {
            console.error(error);
            this.searchResults = [];

          }
        });
      } else {
        this.searchResults = [];
        this.searching$.next(false);
      }
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
