import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../model/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  public username!: string;
  public password!: string;
  public errorMessage!: string;
  constructor(private router: Router, private auth: AuthService) { }
  ngOnInit(): void {
    let token = localStorage.getItem('token');
    if (typeof token != "undefined" && token != "" && token != null) {
    // if (this.auth.authenticated) {
      this.router.navigateByUrl("/admin/main");
    }
  }

  authenticate(form: NgForm) {
    if (form.valid) {

      this.auth.authenticate(this.username, this.password).subscribe(response => {
        
          if (response) {
            this.router.navigateByUrl("/admin/main/");
            window.location.reload();
          }
          this.errorMessage = "Authentication Failed";
        })

    }
  }
}
