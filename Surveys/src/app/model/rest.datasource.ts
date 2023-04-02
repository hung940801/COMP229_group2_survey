import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
// import { Book } from "./book.model";
// import { Cart } from "./cart.model";
// import { Order } from "./order.model";
import { map, switchMap } from "rxjs/operators";
import { HttpHeaders } from '@angular/common/http';
import { Survey } from "./survey.model";
import { Question } from "./question.model";
import { User } from "./user.model";

const PROTOCOL = "http";
const PORT = 3000;
@Injectable()
export class RestDataSource {
  baseUrl: string;
  auth_token!: string;
  user_name!: string;
  constructor(private http: HttpClient) {
    this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
  }
  // getSurveys(): Observable<Survey[]> {
  //   // return this.http.get<Survey[]>(this.baseUrl + "/api/surveys");
  //   return this.http.get<Survey[]>(this.baseUrl + "api/surveys");
  // }
  // getBooks(): Observable<Book[]> {
  //   return this.http.get<Book[]>(this.baseUrl + "books");
  // }
  // saveOrder(order: Order): Observable<Order> {
  //   return this.http.post<Order>(this.baseUrl + "orders", order);
  // }

  register(reg_user: User): Observable<User> {
    return this.http.post<any>(this.baseUrl + "api/admin/register", reg_user);
  }

  authenticate(user: string, pass: string): Observable<boolean> {
    
    return this.http.post<any>(this.baseUrl + "api/admin/login", {
      username: user, password: pass
    }).pipe(map(response => {
      this.auth_token = response.success ? response.token : "";
      this.user_name = response.success ? response.username : "";
      localStorage.setItem("username", response.username)
      localStorage.setItem("token", response.token)
      
      
      return response.success;
    }));
  }

  getSurveys(): Observable<Survey[]> {
    // return this.http.get<Survey[]>(this.baseUrl + "/api/surveys");
    return this.http.get<Survey[]>(this.baseUrl + "api/surveys");
  }
  saveSurvey(survey: Survey): Observable<Survey> {
    return this.http.post<any>(this.baseUrl + "api/surveys/add", survey);
  }
  updateSurvey(survey: Survey): Observable<Survey> {
    return this.http.post<any>(`${this.baseUrl}api/surveys/edit`, survey);
  }
  deleteSurvey(survey: Survey): Observable<Survey> {
    let id = survey.id;
    return this.http.delete<any>(`${this.baseUrl}api/surveys/delete/${id}`);
  }

  getQuestions(): Observable<Question[]> {
    // return this.http.get<Survey[]>(this.baseUrl + "/api/surveys");
    return this.http.get<Question[]>(this.baseUrl + "api/questions");
  }
  saveQuestion(question: Question): Observable<Question> {
    return this.http.post<any>(this.baseUrl + "api/questions/add", question);
  }
  updateQuestion(question: Question): Observable<Question> {
    return this.http.post<any>(`${this.baseUrl}api/questions/edit`, question);
  }
  deleteQuestion(question: Question): Observable<Survey> {
    let id = question.id;
    return this.http.delete<any>(`${this.baseUrl}api/questions/delete/${id}`);
  }
  // getOrders(): Observable<Order[]> {
  //   return this.http.get<Order[]>(this.baseUrl + "orders", this.getOptions());
  // }
  // deleteOrder(id: number): Observable<Order> {
  //   return this.http.delete<Order>(`${this.baseUrl}orders/${id}`,
  //     this.getOptions());
  // }
  // updateOrder(order: Order): Observable<Order> {
  //   return this.http.put<Order>(`${this.baseUrl}orders/${order.id}`,
  //     order, this.getOptions());
  // }
  private getOptions() {
    return {
      headers: new HttpHeaders({
        "Authorization": `Bearer<${this.auth_token}>`
      })
    }
  }
}
