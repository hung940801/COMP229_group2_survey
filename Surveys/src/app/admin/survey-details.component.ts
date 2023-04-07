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
  survey_id: string = ""
  constructor(private repository: SurveyRepository,
    private router: Router,
    activeRoute: ActivatedRoute) {
    this.editing = activeRoute.snapshot.params["mode"] == "edit";
    if (this.editing) {
      // Object.assign(this.survey, repository.getSurvey(activeRoute.snapshot.params["id"]));
      this.survey_id = activeRoute.snapshot.params["id"];
      this.repository.getSurvey(activeRoute.snapshot.params["id"]).subscribe(data => {
        // Object.assign(this.survey, data);
        this.survey = new Survey(
          data._id,
          data.name,
          data.description
        )
      });
    }
  }
  save(form: NgForm) {
    if (this.editing) {
      this.repository.updateSurvey(this.survey).subscribe(data => {
        this.router.navigate(['/admin/main/surveys']);
      });
    }else {
      this.repository.saveSurvey(this.survey).subscribe(data => {
        this.router.navigate(['/admin/main/surveys']);
      });
    }
  }
}
