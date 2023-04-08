import { Component, OnInit } from '@angular/core';
import { QuestionRepository } from '../model/question.repository';
import { Question } from '../model/question.model';

@Component({
  selector: 'app-question-admin',
  templateUrl: './question-admin.component.html',
  styleUrls: ['./question-admin.component.css']
})
export class QuestionAdminComponent implements OnInit {
  questions: any = [];
  questions_2: Question[] = [];
  constructor(private repository: QuestionRepository) {
    // super(route);
  }
  ngOnInit(): void {
    this.getQuestions();
  }

  getQuestions() {
    this.repository.getQuestions().subscribe(data => {
      this.questions = data;
      console.log(this.questions);
      
    });
  }
  deleteQuestion(question: Question) {
    this.repository.deleteQuestion(question).subscribe(data => {
      this.getQuestions();
    });
  }
}
