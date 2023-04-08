import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SurveyRepository } from './survey.repository';
import { RestDataSource } from './rest.datasource';
import { AuthService } from './auth.service';
import { QuestionRepository } from './question.repository';



@NgModule({
  declarations: [],
  imports: [
    HttpClientModule
  ],
  providers: [
    QuestionRepository,
    SurveyRepository,
    RestDataSource,
    AuthService
  ]
})
export class ModelModule { }
