import { Injectable, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { Question } from "./question.model";
import { RestDataSource } from "./rest.datasource";

@Injectable()
export class QuestionRepository {
    private questions: Question[] = [];
    question!: Question;
    constructor(private dataSource: RestDataSource, private router: Router) {
    }
    getQuestions(): Observable<any[]> {
        return this.dataSource.getQuestions();
    }
    getQuestion(id: string): Observable<any> {
        return this.dataSource.getQuestionByID(id);
    }
    getQuestionsBySurvey(survey_id: string): Observable<any[]> {
        return this.dataSource.getQuestionsBySurvey(survey_id);
    }
    saveQuestion(question: Question): Observable<any> {
        // if (question.id == null || question.id == "") {
            return this.dataSource.saveQuestion(question)
            // .subscribe((p: Question) => {
                // this.questions.push(p)
                // this.getQuestions_2();
                // this.router.navigate(['/admin/main/questions']);
            // });
        // } else {
        //     this.dataSource.updateQuestion(question)
        //         .subscribe(p => {
        //         this.questions.splice(this.questions.
        //             findIndex(p => p.id == question.id), 1, question);
        //         });
        // }
    }
    deleteQuestion(question: Question): Observable<any> {
        // let id = question.id;
        // this.dataSource.deleteQuestion(question).subscribe(p => {
        //     this.questions.splice(this.questions.
        //         findIndex(p => p.id == id), 1);
        // })
        return this.dataSource.deleteQuestion(question);
    }
}
