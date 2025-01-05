import { Component, Input } from '@angular/core';
import { Answer } from '../../../api/api.types';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import moment from 'moment';

@Component({
  selector: 'app-answer-card',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './answer-card.component.html',
  styleUrl: './answer-card.component.scss'
})
export class AnswerCardComponent {
  @Input() answer!: Answer;

  constructor() {}

  formatDate(date: string) {
    return moment(date).fromNow();
  }

  textToHtml(text: string) {
    return text.replace(/\n/g, '<br>');
  }
}
