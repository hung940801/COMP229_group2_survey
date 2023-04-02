import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from "./auth.guard";
import { AuthComponent } from './auth.component';
import { SurveyAdminComponent } from './survey-admin.component';
import { SurveyDetailsComponent } from './survey-details.component';
import { QuestionAdminComponent } from './question-admin.component';
import { QuestionDetailsComponent } from './question-details.component';
import { RegisterComponent } from './register.component';

let routing = RouterModule.forChild([
  { path: "auth", component: AuthComponent },
  { path: "register", component: RegisterComponent },
  {
    path: "main", component: AdminComponent, canActivate: [AuthGuard],
    children: [
      { path: "surveys/:mode/:id", component: SurveyDetailsComponent },
      { path: "surveys/:mode", component: SurveyDetailsComponent },
      { path: "surveys", component: SurveyAdminComponent },
      { path: "questions/:mode/:id", component: QuestionDetailsComponent },
      { path: "questions/:mode", component: QuestionDetailsComponent },
      { path: "questions", component: QuestionAdminComponent },
      // { path: "orders", component: OrderTableComponent },
      { path: "**", redirectTo: "surveys" }
    ]
  },
  { path: "**", redirectTo: "auth" }
]);

@NgModule({
  declarations: [AuthComponent, AdminComponent, SurveyAdminComponent, SurveyDetailsComponent, QuestionAdminComponent, QuestionDetailsComponent, RegisterComponent],
  imports: [
    CommonModule, 
    FormsModule, 
    routing
  ],
  providers: [AuthGuard]
})
export class AdminModule { }
