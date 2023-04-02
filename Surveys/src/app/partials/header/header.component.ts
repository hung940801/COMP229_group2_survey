import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/model/auth.service';
import { RestDataSource } from 'src/app/model/rest.datasource';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username!: string|null;
  isLoggedin!: boolean;
  constructor(private auth: AuthService, private datasource: RestDataSource, private router: Router, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    if (this.datasource.auth_token != "") {
      console.log("is undefined");
    // } else if (this.datasource.auth_token == null) {
    //   console.log("null");
      
    } else {
      console.log(JSON.stringify(this.datasource.auth_token));
      
    }
    console.log("1. " + this.datasource.auth_token);
    console.log("2. " + this.auth.authenticated);
    console.log("3. " + localStorage.getItem('username'));
    console.log("4. " + JSON.stringify(this.route.snapshot.data));
    let token = localStorage.getItem('token');
    // if (this.auth.authenticated) {
    if (typeof token != "undefined" && token != "" && token != null) {
      this.isLoggedin = true;
    } else {
      this.isLoggedin = false;
    }
    
  }

  logout() {
    console.log(this.datasource.auth_token);
    this.auth.clear();
    // this.auth.authenticated
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    this.router.navigateByUrl("/");
  }

}
