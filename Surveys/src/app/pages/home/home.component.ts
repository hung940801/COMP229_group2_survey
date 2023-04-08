import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Survey } from 'src/app/model/survey.model';
import { SurveyRepository } from 'src/app/model/survey.repository';
import { PageIndexComponent } from 'src/app/partials/page-index/page-index.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends PageIndexComponent implements OnInit {
  surveys!: any[];
  constructor(route: ActivatedRoute, private repository: SurveyRepository) {
    super(route);
  }
  override ngOnInit() {
    this.getSurveys();
  }

  getSurveys() {
    return this.repository.getSurveys().subscribe(data => {
      this.surveys = data;
    });
  }
}
