import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../model/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthService) { }
  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean {
    console.log(this.auth.authenticated + "---");
    
    let token = localStorage.getItem('token');
    // if (!this.auth.authenticated) {
    if (typeof token == "undefined" || token == "" || token == null) {
      this.router.navigateByUrl("/admin/auth");
      return false;
    }
    return true;
  }
  
}
