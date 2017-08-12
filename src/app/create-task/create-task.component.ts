import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  @Input() tasks: Array<object>;

  constructor(private fb: FormBuilder, private router: Router) {
    this.createTaskForm = fb.group({
      'name': ['', Validators.required],
      'createdDate': ['', Validators.required],
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
   }

  ngOnInit() {
  }

  clearForm(): boolean {
    this.createTaskForm.reset();
    return false;
  }
  createTask(value: any): boolean {
    this.tasks.push(value);
    this.createTaskForm.reset();
    return false;
  }
}
