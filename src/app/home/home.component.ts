import { Component, OnInit, Output } from '@angular/core';
import { Task } from 'app/tasks.model';
import { LoginService } from 'app/login/login.service';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  tasks: Array<Task> = [];
  assignedToTasks: Array<Task> = [];
  assignedByTasks: Array<Task> = [];
  currentUser: string;

  constructor(public loginService: LoginService) {
    if (!localStorage.getItem('tasks')) {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    } else {
      this.tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    this.currentUser = loginService.getUser();
    this.filterTasks();
  }

  ngOnInit() {
  }

  filterTasks(): void {
    if (localStorage.getItem('tasks')) {
      for (const i of this.tasks) {
        if (i.assignedTo === this.currentUser) {
          this.assignedToTasks.push(i);
        }
        if (i.assignedBy === this.currentUser) {
          this.assignedByTasks.push(i);
        }
      }
    }
  }

  showModal(): boolean {
    $('.ui.basic.modal').modal('show');
    return false;
  }
}
