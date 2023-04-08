import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Question } from '../model/question.model';
import { Survey } from '../model/survey.model';
import { SurveyRepository } from '../model/survey.repository';

@Component({
  selector: 'app-survey-result',
  templateUrl: './survey-result.component.html',
  styleUrls: ['./survey-result.component.css']
})
export class SurveyResultComponent {
  survey: Survey = new Survey();
  questions!: any[];
  survey_id!: string;
  constructor(private repository: SurveyRepository,
    private router: Router,
    activeRoute: ActivatedRoute) {
    this.survey_id = activeRoute.snapshot.params["id"];
    this.repository.getSurveyResult(activeRoute.snapshot.params["id"]).subscribe(data => {
      // Object.assign(this.survey, data);
      this.survey = new Survey(
        data.survey._id,
        data.survey.name,
        data.survey.description
      )
      this.questions = data.questions;
      console.log(this.questions);
      
    });
  }
  calcAnswerRate(answered: number, ansCount: number) {
    let rate = 0;
    if (answered != 0 && ansCount != 0) {
      rate = answered/ansCount * 100;
    }
    return rate;
  }
}
