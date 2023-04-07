import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PartialsModule } from '../partials/partials.module';
import { AppRoutingModule } from '../app-routing.module';
import { ModelModule } from '../model/model.module';
import { SurveyQuestionComponent } from './survey-question/survey-question.component';



@NgModule({
  declarations: [
    HomeComponent,
    SurveyQuestionComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    PartialsModule,
    ModelModule
  ],
  exports: [
    PartialsModule
  ]
})
export class PagesModule { }
