import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from "./auth.guard";
import { AuthComponent } from './auth.component';
import { SurveyAdminComponent } from './survey-admin.component';
import { SurveyDetailsComponent } from './survey-details.component';

let routing = RouterModule.forChild([
  { path: "auth", component: AuthComponent },
  {
    path: "main", component: AdminComponent, canActivate: [AuthGuard],
    children: [
      { path: "surveys/:mode/:id", component: SurveyDetailsComponent },
      { path: "surveys/:mode", component: SurveyDetailsComponent },
      { path: "surveys", component: SurveyAdminComponent },
      // { path: "orders", component: OrderTableComponent },
      { path: "**", redirectTo: "surveys" }
    ]
  },
  { path: "**", redirectTo: "auth" }
]);

@NgModule({
  declarations: [AuthComponent, AdminComponent, SurveyAdminComponent, SurveyDetailsComponent],
  imports: [
    CommonModule, 
    FormsModule, 
    routing
  ],
  providers: [AuthGuard]
})
export class AdminModule { }
