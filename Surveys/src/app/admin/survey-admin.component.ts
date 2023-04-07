import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SurveyRepository } from '../model/survey.repository';
import { Survey } from '../model/survey.model';
import { PageIndexComponent } from '../partials/page-index/page-index.component';

@Component({
  selector: 'app-survey-admin',
  templateUrl: './survey-admin.component.html',
  styleUrls: ['./survey-admin.component.css']
})
export class SurveyAdminComponent implements OnInit {
  surveys!: any[];
  constructor(private repository: SurveyRepository) {
    // super(route);
    this.repository.getSurveys().subscribe((data) => {
      console.log(data);
    });
  }
  ngOnInit() {
    this.getSurveys();
  }

  getSurveys() {
    this.repository.getSurveys().subscribe(data => {
      this.surveys = data;
    });
  }
  deleteSurvey(id: Survey) {
    this.repository.deleteSurvey(id).subscribe(data => {
      this.getSurveys();
    });
  }
}
