import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/model/question.model';
import { QuestionRepository } from 'src/app/model/question.repository';
import { Survey } from 'src/app/model/survey.model';
import { SurveyRepository } from 'src/app/model/survey.repository';

@Component({
  selector: 'app-survey-question',
  templateUrl: './survey-question.component.html',
  styleUrls: ['./survey-question.component.css']
})
export class SurveyQuestionComponent {
  // editing: boolean = false;
  survey: Survey = new Survey();
  questions!: Question[];
  constructor(private repository: SurveyRepository,
    private questionResitory: QuestionRepository,
    private router: Router,
    private activeRoute: ActivatedRoute) {
    // this.editing = activeRoute.snapshot.params["mode"] == "edit";
    // if (this.editing) {
      // Object.assign(this.survey, repository.getSurvey(activeRoute.snapshot.params["id"]));
      // this.repository.getSurvey(activeRoute.snapshot.params["id"]).subscribe(data => {
      //   Object.assign(this.survey, data);
      // });
    // }
    this.getSurveyQuestions();
  }
  getSurveyQuestions() {
    this.repository.getSurvey(this.activeRoute.snapshot.params["id"]).subscribe(data => {
      this.survey = data;
      // console.log(data._id);
      
      this.questionResitory.getQuestionsBySurvey(data._id).subscribe(questionData => {
        // console.log(questionData);

        this.questions = questionData;
        
      });
    });
  }
  // save(form: NgForm) {
  //   this.repository.saveSurvey(this.survey).subscribe(data => {
  //     this.router.navigate(['/admin/main/surveys']);
  //   });
  // }
}
