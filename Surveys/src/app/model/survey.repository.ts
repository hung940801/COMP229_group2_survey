import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Survey } from './survey.model';
import { RestDataSource } from "./rest.datasource";
import { Router } from '@angular/router';

@Injectable()
export class SurveyRepository {
    private surveys: Survey[] = [];
    constructor(private dataSource: RestDataSource, private router: Router) {
        dataSource.getSurveys().subscribe(data => {
            this.surveys = data;
        });
    }
    getSurveys(): Observable<any[]> {
        return this.dataSource.getSurveys();
    }
    // getSurvey(id: string): Survey {
    //     let s = {};
    //     for (let i = 0; i < this.surveys.length; i++) {
    //         // console.log(this.surveys[i].id);
            
    //         if (this.surveys[i].id == id) {
    //             s = this.surveys[i];
    //         }
    //     }
    //     return s;
    // }
    getSurvey(id: string): Observable<any> {
        return this.dataSource.getSurveyByID(id);
    }

    saveSurvey(survey: Survey): Observable<any> {
        return this.dataSource.saveSurvey(survey);
        // if (survey.id == null || survey.id == "") {
            // this.dataSource.saveSurvey(survey).subscribe((p: Survey) => {
            //     this.surveys.push(p)
            //     this.router.navigate(['/admin/main/surveys']);
            // });
        // } else {
        //     this.dataSource.updateSurvey(survey)
        //         .subscribe(p => {
        //         this.surveys.splice(this.surveys.
        //             findIndex(p => p.id == survey.id), 1, survey);
        //         });
        // }
    }
    deleteSurvey(survey: Survey): Observable<any> {
        // let id = survey.id;
        // this.dataSource.deleteSurvey(survey).subscribe(p => {
        //     this.surveys.splice(this.surveys.
        //         findIndex(p => p.id == id), 1);
        // })
        return this.dataSource.deleteSurvey(survey);
    }
}
