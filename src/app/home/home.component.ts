import { Component, OnInit, Output, Input } from '@angular/core';
import { Task } from 'app/tasks.model';
import { LoginService } from 'app/login/login.service';
import { TaskService } from 'app/task.service';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  assignedToTasks: Array<Task> = [];
  assignedByTasks: Array<Task> = [];
  currentUser: string;

  constructor(public loginService: LoginService, private taskService: TaskService) {
    this.currentUser = this.loginService.getUser();
  }

  ngOnInit() {
    this.TaskByUser();
    this.TaskToUser();
  }

  TaskByUser(): void {
    this.taskService.TaskByUser(this.currentUser).subscribe(res => {this.assignedByTasks = res }, err => {console.log(err)});
  }

  TaskToUser(): void {
    this.taskService.TaskToUser(this.currentUser).subscribe(res => {this.assignedToTasks = res }, err => {console.log(err)});
  }

  showModal(): boolean {
    $('.ui.basic.modal').modal('show');
    return false;
  }
}
