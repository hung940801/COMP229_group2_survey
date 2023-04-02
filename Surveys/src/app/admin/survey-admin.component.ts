import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SurveyRepository } from '../model/survey.repository';
import { Survey } from '../model/survey.model';
import { PageIndexComponent } from '../partials/page-index/page-index.component';

@Component({
  selector: 'app-survey-admin',
  templateUrl: './survey-admin.component.html',
  styleUrls: ['./survey-admin.component.css']
})
export class SurveyAdminComponent {
  constructor(private repository: SurveyRepository) {
    // super(route);
  }

  getSurveys(): Survey[] {
    return this.repository.getSurveys();
  }
  deleteSurvey(id: Survey) {
    this.repository.deleteSurvey(id);
  }
}
