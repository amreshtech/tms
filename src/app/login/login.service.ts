import { Injectable } from '@angular/core';
import { User } from 'app/users.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

@Injectable()
export class LoginService {

  constructor(private http: Http) {

  }

  login(user: string, password: string): Observable<Number> {
    const url = 'http://localhost:8080/user/login';
    const body = `{"username":"${user}","password":"${password}"}`;
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.post(url, body, options).map(res => res.status).catch(error => Observable.throw(new Error(error.status)));
  }

  logout(): any {
    localStorage.removeItem('username');
  }

  getUser(): any {
    return localStorage.getItem('username');
  }

  isLoggedIn(): boolean {
    return this.getUser() !== null;
  }
}
