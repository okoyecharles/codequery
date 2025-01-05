import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Subject, takeUntil } from 'rxjs';
import { QueryEndpointsService } from '../../../api/query-endpoints.service';

@Component({
  selector: 'app-ask-query-dialog',
  standalone: true,
  imports: [MatProgressSpinnerModule, MatIconModule],
  templateUrl: './ask-query-dialog.component.html',
  styleUrl: './ask-query-dialog.component.scss'
})
export class AskQueryDialogComponent {
  destroy$: Subject<boolean> = new Subject<boolean>();
  processing: boolean = false;
  error: string | null = null;

  formData = {
    queryQuestion: '',
  }

  constructor(
    private dialogRef: MatDialogRef<AskQueryDialogComponent>,
    private queryService: QueryEndpointsService,
  ) { }

  askQuery() {
    if (!this.formData.queryQuestion.trim()) {
      this.error = 'Please enter a question';
      return;
    }

    this.processing = true;
    const query = {
      question: this.formData.queryQuestion,
    }
    this.queryService.queryCreateQuery(query)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ({ question }) => {
          this.processing = false;
          this.closeDialog({ question });
        },
        error: (error) => {
          this.processing = false;
          this.error = error.message;
        }
      });
  }

  closeDialog(data?: any): void {
    this.dialogRef.close(data);
  };

  handleInput(event: any, key: keyof typeof this.formData) {
    if (!event.target.value) return;
    this.formData[key] = event.target.value;
  }

  preventDefault(event: Event) {
    event.preventDefault();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
