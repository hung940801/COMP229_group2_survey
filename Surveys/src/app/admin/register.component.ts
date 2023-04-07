import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../model/auth.service';
import { User } from '../model/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  public username!: string;
  public password!: string;
  public displayname!: string;
  public email!: string;
  reg_user: User = new User();
  constructor(private router: Router, private auth: AuthService) { }
  // save(form: NgForm) {
  //   this.repository.saveSurvey(this.survey);
  //   this.router.navigateByUrl("/admin/main/");
  // }
  register(form: NgForm) {
    let reg_user = {
      "username": this.username,
      "password": this.password,
      "displayName": this.displayname,
      "email": this.email
    }
    this.auth.register(reg_user)
    this.router.navigateByUrl("/admin/main");
  }
}
