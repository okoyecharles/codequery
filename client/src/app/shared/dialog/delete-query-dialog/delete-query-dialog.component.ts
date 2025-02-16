import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { Query } from '../../../api/api.types';
import { QueryEndpointsService } from '../../../api/query-endpoints.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-delete-query-dialog',
  standalone: true,
  imports: [MatProgressSpinnerModule, MatIconModule],
  templateUrl: './delete-query-dialog.component.html',
  styleUrl: './delete-query-dialog.component.scss'
})
export class DeleteQueryDialogComponent {
  destroy$: Subject<boolean> = new Subject<boolean>();
  processing: boolean = false;
  error: string | null = null;

  formData = {
    queryQuestion: '',
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { query: Query },
    private dialogRef: MatDialogRef<DeleteQueryDialogComponent>,
    private queryService: QueryEndpointsService,
  ) {
    this.formData.queryQuestion = data.query.question;
  }

  editQuery() {
    if (!this.formData.queryQuestion.trim()) {
      this.error = 'Please enter a question';
      return;
    }

    this.processing = true;
    const query = {
      question: this.formData.queryQuestion,
    };
    this.queryService.queryDeleteQuery(this.data.query._id)
      .subscribe({
        next: () => {
          this.processing = false;
          this.closeDialog();
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
