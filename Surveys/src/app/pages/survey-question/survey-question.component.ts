import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
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
  questions: any[] = [];
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
      this.survey = new Survey(
        data._id,
        data.name,
        data.description
      );
      
      // console.log(data._id);
      
      this.questionResitory.getQuestionsBySurvey(data._id).subscribe(questionData => {
        // console.log(questionData);

        // this.questions = questionData;
        questionData.map((q, i) => {
          // console.log(q);
          
          let tmp_q = {
            id: q.id,
            question_content: q.question_content,
            answer: ""
          }
          this.questions.push(tmp_q);
        });

        // console.log(this.questions);
        
        
      });
    });
  }
  answerSurvey(form: NgForm) {
    // console.log(form.value);
    let formVal = form.value;
    let submittedSurvey = [];
    for (const key in formVal) {
      let quest_id = key.replace('question_', '');
      let quest = {
        id: quest_id,
        answer: formVal[key]
      };
      submittedSurvey.push(quest);
    }

    // console.log(this.survey.id);
    
    
    this.repository.doSurvey(this.survey, submittedSurvey).subscribe(data => {
      this.router.navigate(['/']);
    });
  }
}
