import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CalendarModule } from 'primeng/primeng';
import * as moment from 'moment';
import { Task } from 'app/tasks.model';
import { LoginService } from 'app/login/login.service';


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

  @Input() tasks: Array<Task>;
  minDate: Date;

  constructor(private fb: FormBuilder, loginService: LoginService) {
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
    this.createdDate.setValue(moment());
    this.assignedBy.setValue(loginService.getUser());
    this.minDate = new Date();
  }

  ngOnInit() {
  }

  clearForm(): boolean {
    this.createTaskForm.reset();
    return false;
  }
  createTask(value: any): boolean {
    this.tasks.push(value);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    this.createTaskForm.reset();
    return false;
  }
}
