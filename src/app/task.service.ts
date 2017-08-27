import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
// import { Observable } from 'rxjs/Observable';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/observable/interval';
import { Task } from './tasks.model';

@Injectable()
export class TaskService {
    constructor(private http: Http) {

    }

    createTask(task: any): Observable<Number> {
        const url = 'http://localhost:8080/task/save';
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        return this.http.post(url, task, options).map(res => res.status).catch(err => Observable.throw(new Error(err.status)));
    }

    TaskByUser(user): Observable<Task[]> {
        const url = 'http://localhost:8080/task/by/' + user;
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        return Observable
        .interval(300)
        .flatMap(() => this.http.get(url, options))
        .map(res => res.json())
        .catch(err => Observable.throw(new Error(err.status)));
        // return this.http.get(url, options).map(res => res.json()).catch(err => Observable.throw(new Error(err.status)));
    }

    TaskToUser(user): Observable<Task[]> {
        const url = 'http://localhost:8080/task/to/' + user;
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        return Observable
        .interval(300)
        .flatMap(() => this.http.get(url, options))
        .map(res => res.json())
        .catch(err => Observable.throw(new Error(err.status)));
        // return this.http.get(url, options).map(res => res.json()).catch(err => Observable.throw(new Error(err.status)));
    }
}
