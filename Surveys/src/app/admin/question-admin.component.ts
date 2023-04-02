import { Component } from '@angular/core';
import { QuestionRepository } from '../model/question.repository';
import { Question } from '../model/question.model';

@Component({
  selector: 'app-question-admin',
  templateUrl: './question-admin.component.html',
  styleUrls: ['./question-admin.component.css']
})
export class QuestionAdminComponent {
  constructor(private repository: QuestionRepository) {
    // super(route);
  }

  getQuestions(): Question[] {
    return this.repository.getQuestions();
  }
  deleteQuestion(question: Question) {
    this.repository.deleteQuestion(question);
  }
}
