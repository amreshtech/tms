import { Component, OnInit, Output, Input } from '@angular/core';
import { Task } from 'app/tasks.model';
import { LoginService } from 'app/login/login.service';
import { TaskService } from 'app/task.service';
declare var $: any;
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs/Observable';
import { UserService } from 'app/user.service';
import { FirebaseListObservable } from 'angularfire2/database';
import { User } from 'app/users.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  assignedToTasks: Array<Task> = [];
  assignedByTasks: Array<Task> = [];
  currentUser: string;
  users: FirebaseListObservable<User[]>;

  constructor(public loginService: LoginService,
    private taskService: TaskService,
    private af: AngularFireAuth,
  private userService: UserService) {
    // this.currentUser = this.loginService.getUser();
    // this.taskService.getAllTasks().subscribe(res => console.log(res));
  }

  ngOnInit() {
    this.af.authState.subscribe(authState => {
      this.currentUser = (authState.displayName != null) ? authState.displayName.split(' ')[0] : authState.email.split('@')[0];
      this.userService.addUserToFirebase(authState.uid, this.currentUser)});
    this.TaskByUser();
    this.TaskToUser();
  }

  TaskByUser(): void {
    // this.taskService.TaskByUser(this.currentUser).subscribe(res => {this.assignedByTasks = res }, err => {console.log(err)});
  }

  TaskToUser(): void {
    // this.taskService.TaskToUser(this.currentUser).subscribe(res => {this.assignedToTasks = res }, err => {console.log(err)});
  }

  showModal(): boolean {
    $('.ui.basic.modal').modal('show');
    return false;
  }

}
