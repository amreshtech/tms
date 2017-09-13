import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CalendarModule } from 'primeng/primeng';
import * as moment from 'moment';
import { Task } from 'app/tasks.model';
import { LoginService } from 'app/login/login.service';
import { TaskService } from 'app/task.service';
import { Observable } from 'rxjs/Observable';
import { UserService } from 'app/user.service';
declare var $: any;

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {
  createTaskForm: FormGroup;
  name: AbstractControl;
  createdDate: AbstractControl;
  assignedBy: AbstractControl;
  assignedTo: AbstractControl;
  description: AbstractControl;
  deadline: AbstractControl;
  tempAssignedTo: any;
  tempAssignedByName: string;
  tempAssignedToName: string;

  @Input() tasks: Array<Task>;
  minDate: Date;
  status: string;
  done: boolean;

  constructor(private fb: FormBuilder,
    private taskService: TaskService,
    private loginService: LoginService,
    private userService: UserService,
  ) {
    this.createTaskForm = fb.group({
      'name': ['', Validators.required],
      'createdDate': [''],
      'assignedBy': ['', Validators.required],
      'assignedTo': ['', Validators.required],
      'description': ['', Validators.required],
      'deadline': ['', Validators.required]
    });

    this.name = this.createTaskForm.controls['name'];
    this.createdDate = this.createTaskForm.controls['createdDate'];
    this.assignedBy = this.createTaskForm.controls['assignedBy'];
    this.assignedTo = this.createTaskForm.controls['assignedTo'];
    this.description = this.createTaskForm.controls['description'];
    this.deadline = this.createTaskForm.controls['deadline'];
    this.createdDate.setValue(new Date());
    this.minDate = new Date();
    this.status = 'open';
    this.done = false;

    this.userService.getCurrentUserDetails()
      .subscribe(authState => {
        this.assignedBy.setValue(authState.uid);
        this.tempAssignedByName = (authState.displayName != null) ? authState.displayName.split(' ')[0] : authState.email.split('@')[0];
      });

    this.userService.getAllUsers()
      .subscribe(userList => {
        $('.ui.search')
          .search({
            source: userList.map(data => {
              return { title: data.displayName, uid: data.uid }
            }),
            onSelect: (res => {this.tempAssignedTo = res.uid; this.tempAssignedToName = res.title})
          });
      });
  }

  ngOnInit() {
  }

  clearForm(): boolean {
    this.createTaskForm.reset();
    return false;
  }
  createTask(value: any): boolean {
    value.status = this.status;
    value.done = this.done;
    value.assignedToName = this.tempAssignedToName;
    value.assignedByName = this.tempAssignedByName;
    value.assignedTo = this.tempAssignedTo;
    value.createdDate = value.createdDate.toString();
    value.deadline = value.deadline.toString();
    console.log(this.createdDate);
    this.taskService.createTask(value) /*.subscribe(res => {alert('Task Created')}, err => {alert('Task alread exists')});*/
    this.createTaskForm.reset();
    return false;
  }

  /* createTask(value: any): boolean {
    value.status = this.status;
    value.done = this.done;
    value.assignedTo = {'username': value.assignedTo};
    this.taskService.createTask(value)
    return false;
  } */
}
