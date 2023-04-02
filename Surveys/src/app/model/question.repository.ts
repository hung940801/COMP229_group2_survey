import { Injectable } from "@angular/core";
import { Question } from "./question.model";
import { RestDataSource } from "./rest.datasource";

@Injectable()
export class QuestionRepository {
    private questions: Question[] = [];
    constructor(private dataSource: RestDataSource) {
        dataSource.getQuestions().subscribe(data => {
            this.questions = data;
        });
    }
    getQuestions(): Question[] {
        return this.questions;
    }
    getQuestion(id: string): Question {
        let s = {};
        for (let i = 0; i < this.questions.length; i++) {
            console.log(this.questions[i].id);
            
            if (this.questions[i].id == id) {
                s = this.questions[i];
            }
        }
        return s;
    }
    saveQuestion(question: Question) {
        if (question.id == null || question.id == "") {
            this.dataSource.saveQuestion(question).subscribe((p: Question) => this.questions.push(p));
        } else {
            this.dataSource.updateQuestion(question)
                .subscribe(p => {
                this.questions.splice(this.questions.
                    findIndex(p => p.id == question.id), 1, question);
                });
        }
    }
    deleteQuestion(question: Question) {
        let id = question.id;
        this.dataSource.deleteQuestion(question).subscribe(p => {
            this.questions.splice(this.questions.
                findIndex(p => p.id == id), 1);
        })
    }
}
