import { Component } from '@angular/core';
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
export class QuestionDetailsComponent {
  editing: boolean = false;
  question: Question = new Question();
  constructor(private repository: QuestionRepository,
    private surveyRepository: SurveyRepository,
    private router: Router,
    activeRoute: ActivatedRoute) {
    this.editing = activeRoute.snapshot.params["mode"] == "edit";
    if (this.editing) {
      Object.assign(this.question, repository.getQuestion(activeRoute.snapshot.params["id"]));
    }
  }
  getSurveys(): Survey[] {
    return this.surveyRepository.getSurveys();
  }
  save(form: NgForm) {
    this.repository.saveQuestion(this.question);
    this.router.navigateByUrl("/admin/main");
    setTimeout(() => {
      this.router.navigateByUrl("/admin/main/questions");
    }, 500);
  }
}
