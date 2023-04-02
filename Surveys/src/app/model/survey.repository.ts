import { Injectable } from '@angular/core';
import { Survey } from './survey.model';
import { RestDataSource } from "./rest.datasource";

@Injectable()
export class SurveyRepository {
    private surveys: Survey[] = [];
    constructor(private dataSource: RestDataSource) {
        dataSource.getSurveys().subscribe(data => {
            this.surveys = data;
        });
    }
    getSurveys(): Survey[] {
        return this.surveys;
    }
    getSurvey(id: string): Survey {
        let s = {};
        for (let i = 0; i < this.surveys.length; i++) {
            // console.log(this.surveys[i].id);
            
            if (this.surveys[i].id == id) {
                s = this.surveys[i];
            }
        }
        return s;
    }
    saveSurvey(survey: Survey) {
        if (survey.id == null || survey.id == "") {
            this.dataSource.saveSurvey(survey).subscribe((p: Survey) => this.surveys.push(p));
        } else {
            this.dataSource.updateSurvey(survey)
                .subscribe(p => {
                this.surveys.splice(this.surveys.
                    findIndex(p => p.id == survey.id), 1, survey);
                });
        }
    }
    deleteSurvey(survey: Survey) {
        let id = survey.id;
        this.dataSource.deleteSurvey(survey).subscribe(p => {
            this.surveys.splice(this.surveys.
                findIndex(p => p.id == id), 1);
        })
    }
}
