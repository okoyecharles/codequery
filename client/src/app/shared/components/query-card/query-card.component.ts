import { Component, Input } from '@angular/core';
import { Query } from '../../../api/api.types';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-query-card',
  standalone: true,
  imports: [DatePipe, MatIconModule, RouterModule],
  templateUrl: './query-card.component.html',
  styleUrl: './query-card.component.scss'
})
export class QueryCardComponent {
  @Input() query!: Query;
}
