import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { RestDataSource } from "./rest.datasource";
import { User } from "./user.model";
@Injectable()
export class AuthService {
  private reg_user: User[] = [];
  constructor(private datasource: RestDataSource) { }
  authenticate(username: string, password: string): Observable<boolean> {
    return this.datasource.authenticate(username, password);
  }
  get authenticated(): boolean {
    return this.datasource.auth_token != "";
  }
  clear() {
    this.datasource.auth_token != "";
  }
  register(reg_user: User) {
    this.datasource.register(reg_user).subscribe((p: User) => this.reg_user.push(p));
  }
}
