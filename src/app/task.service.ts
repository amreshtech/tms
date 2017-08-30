import { Injectable, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
// import { Observable } from 'rxjs/Observable';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/observable/interval';
import { Task } from './tasks.model';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

@Injectable()
export class TaskService implements OnInit {

    tasks: FirebaseListObservable<Task[]>;
    private basePath = '/tasks';
    task: FirebaseListObservable<Task>;
    constructor(private http: Http, private db: AngularFireDatabase) {
    }

    /* Firebase REST API */

    getAllTasks(): FirebaseListObservable<Task[]> {
        console.log(`get ${this.tasks}`);
        this.tasks = this.db.list(this.basePath);
        return this.tasks;
    }

    createTask(task: Task): void {
        this.getAllTasks();
        console.log(this.tasks);
        console.log(task);
        this.tasks.push(task).catch(err => this.handleError(err));
    }

    private handleError(error) {
        console.log(error)
    }

    ngOnInit(): void {
    }
    /* Traditional MySQL REST API */
    /* createTask(task: any): Observable<Number> {
        const url = 'http://localhost:8080/task/save';
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        return this.http.post(url, task, options).map(res => res.status).catch(err => Observable.throw(new Error(err.status)));
    }*/

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
