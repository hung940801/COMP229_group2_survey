import { Component } from '@angular/core';
import { Survey } from '../model/survey.model';
import { SurveyRepository } from '../model/survey.repository';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-survey-details',
  templateUrl: './survey-details.component.html',
  styleUrls: ['./survey-details.component.css']
})
export class SurveyDetailsComponent {
  editing: boolean = false;
  survey: Survey = new Survey();
  constructor(private repository: SurveyRepository,
    private router: Router,
    activeRoute: ActivatedRoute) {
    this.editing = activeRoute.snapshot.params["mode"] == "edit";
    if (this.editing) {
      // Object.assign(this.survey, repository.getSurvey(activeRoute.snapshot.params["id"]));
      this.repository.getSurvey(activeRoute.snapshot.params["id"]).subscribe(data => {
        Object.assign(this.survey, data);
      });
    }
  }
  save(form: NgForm) {
    this.repository.saveSurvey(this.survey).subscribe(data => {
      this.router.navigate(['/admin/main/surveys']);
    });
  }
}
