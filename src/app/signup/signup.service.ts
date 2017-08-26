import { Injectable, Input } from '@angular/core';
import { User } from 'app/users.model';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SignupService {
  user: User;
  users: Array<User>;
  existingUser: any;

  constructor(private http: Http) {
  }

  signup(user: string, password: string): Observable<Number> {
    const url = 'http://localhost:8080/user';
    const body = `{"username":"${user}","password":"${password}"}`;
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.post(url, body, options).map(res => res.status).catch(error => Observable.throw(new Error(error.status)));
  }
}
