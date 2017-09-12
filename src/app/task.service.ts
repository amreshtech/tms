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
    private taskPath = '/tasks';
    constructor(private http: Http, private db: AngularFireDatabase) {
        this.tasks = db.list('/tasks');
    }

    private handleError(error) {
        console.log(error)
    }

    ngOnInit(): void {}

    /* Firebase REST API */

    getTask(taskid) {
        return this.db.object(`${this.taskPath}/${taskid}`);
    }

    getAllTasks(): FirebaseListObservable<Task[]> {
        return this.db.list(this.taskPath);
    }

    createTask(task: Task): void {
        this.tasks.push(task).catch(err => this.handleError(err));
    }

    TasksByUser(uid): FirebaseListObservable<Task[]> {
        const userList = this.db.list(this.taskPath, {
            query: {
                orderByChild: 'assignedBy',
                equalTo: uid
            }
        });
        return userList;
    }

    TasksToUser(uid): FirebaseListObservable<Task[]> {
        const userList = this.db.list(this.taskPath, {
            query: {
                orderByChild: 'assignedTo',
                equalTo: uid
            }
        });
        return userList;
    }

    closeTask(task) {
            this.db.object(`${this.taskPath}/${task.$key}`).update({status: 'closed', done: 'true'});
    }

    deleteTask(task) {
        this.db.object(`${this.taskPath}/${task.$key}`).remove();
    }

    updateTask(task) {
        console.log(task);
        this.db.object(`${this.taskPath}/${task.$key}`).update(task);
    }


    /* Traditional MySQL REST API */
    /* createTask(task: any): Observable<Number> {
        const url = 'http://localhost:8080/task/save';
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        return this.http.post(url, task, options).map(res => res.status).catch(err => Observable.throw(new Error(err.status)));
    }*/

    /* TaskByUser(user): Observable<Task[]> {
        const url = 'http://localhost:8080/task/by/' + user;
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        return Observable
        .interval(300)
        .flatMap(() => this.http.get(url, options))
        .map(res => res.json())
        .catch(err => Observable.throw(new Error(err.status)));
        // return this.http.get(url, options).map(res => res.json()).catch(err => Observable.throw(new Error(err.status)));
    } */



    /* TaskToUser(user): Observable<Task[]> {
        const url = 'http://localhost:8080/task/to/' + user;
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        return Observable
        .interval(300)
        .flatMap(() => this.http.get(url, options))
        .map(res => res.json())
        .catch(err => Observable.throw(new Error(err.status)));
        // return this.http.get(url, options).map(res => res.json()).catch(err => Observable.throw(new Error(err.status)));
    } */
}
