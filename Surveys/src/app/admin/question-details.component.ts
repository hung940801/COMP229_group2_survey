import { Component, OnInit } from '@angular/core';
import { Question } from '../model/question.model';
import { QuestionRepository } from '../model/question.repository';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { SurveyRepository } from '../model/survey.repository';
import { Survey } from '../model/survey.model';

@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.css']
})
export class QuestionDetailsComponent implements OnInit {
  editing: boolean = false;
  question: Question = new Question();
  surveys!: any[];
  questions: any = [];
  questionToEdit!: Question;
  constructor(private repository: QuestionRepository,
    private surveyRepository: SurveyRepository,
    private router: Router,
    activeRoute: ActivatedRoute) {
    this.editing = activeRoute.snapshot.params["mode"] == "edit";
    if (this.editing) {
      this.repository.getQuestion(activeRoute.snapshot.params["id"]).subscribe(data => {
        Object.assign(this.question, data);
      });
    }
  }
  ngOnInit(): void {
    this.getSurveys();
    this.getQuestions();
  }
  getQuestions() {
    this.repository.getQuestions().subscribe(data => {
      this.questions = data;
    });
  }
  getSurveys() {
    return this.surveyRepository.getSurveys().subscribe(data => {
      this.surveys = data;
    });
  }
  save(form: NgForm) {
    this.repository.saveQuestion(this.question).subscribe(data => {;
      this.router.navigate(['/admin/main/questions']);
    });
  }
}
