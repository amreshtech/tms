import { Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { TaskService } from 'app/task.service';
import { UserService } from 'app/user.service';
import { Task } from 'app/tasks.model';
import {SelectItem} from 'primeng/primeng';
declare var $: any;

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit, OnChanges {

  @Input() task: Task;
  taskDetailsForm: FormGroup;
  name: AbstractControl;
  createdDate: AbstractControl;
  assignedTo: AbstractControl;
  description: AbstractControl;
  deadline: AbstractControl;
  tempAssignedToName: string;
  tempAssignedTo: string;
  assignedByName: string;
  assignedBy: string;
  isDisabled: boolean;
  status: AbstractControl;
  isDone: AbstractControl;
  currentTask: Task;

  statusArray: SelectItem[];

  constructor(private taskService: TaskService,
    private userService: UserService,
    private fb: FormBuilder,
  private cd: ChangeDetectorRef) {
    this.isDisabled = true;
    this.statusArray = [];
    this.statusArray.push({label: 'Open', value: 'open'});
    this.statusArray.push({label: 'Closed', value: 'closed'});

    this.taskDetailsForm = fb.group({
      'name': [{value: '', disabled: this.isDisabled}, Validators.required],
      'createdDate': [{value: '', disabled: this.isDisabled}, Validators.required],
      'assignedByName': [{value: '', disabled: this.isDisabled}, Validators.required],
      'assignedToName': [{value: '', disabled: this.isDisabled}, Validators.required],
      'assignedTo': [{value: '', disabled: this.isDisabled}, Validators.required],
      'description': [{value: '', disabled: this.isDisabled}, Validators.required],
      'deadline': [{value: '', disabled: this.isDisabled}, Validators.required],
      'status': [{value: '', disabled: this.isDisabled}, Validators.required],
      'isDone': [{value: '', disabled: this.isDisabled}, Validators.required]
    });

    this.name = this.taskDetailsForm.controls['name'];
    this.createdDate = this.taskDetailsForm.controls['createdDate'];
    this.assignedTo = this.taskDetailsForm.controls['assignedTo'];
    this.description = this.taskDetailsForm.controls['description'];
    this.deadline = this.taskDetailsForm.controls['deadline'];
    this.status = this.taskDetailsForm.controls['status'];
    this.isDone = this.taskDetailsForm.controls['isDone'];

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

  ngOnChanges(changes: SimpleChanges): void {
    this.currentTask = changes.task.currentValue;
    if (this.currentTask) {
      this.name.setValue(this.currentTask.name);
      this.createdDate.setValue(new Date(this.currentTask.createdDate));
      this.assignedTo.setValue(this.currentTask.assignedToName);
      this.description.setValue(this.currentTask.description);
      this.deadline.setValue(new Date(this.currentTask.deadline));
      this.status.setValue(this.currentTask.status);
      this.isDone.setValue(this.currentTask.done);
      this.tempAssignedTo = this.currentTask.assignedTo;
      this.tempAssignedToName = this.currentTask.assignedToName;
    }
  }

  changeStatus() {
    if (this.isDone.value) {
      this.status.setValue('closed');
    }else {
      this.status.setValue('open');
    }
  }
  editTask() {
    this.isDisabled = false;
    this.name.enable();
    this.assignedTo.enable();
    this.createdDate.enable();
    this.deadline.enable();
    this.description.enable();
    this.status.enable();
    this.isDone.enable();
  }

  updateTask(value) {
    this.currentTask.name = value.name;
    this.currentTask.createdDate = value.createdDate.toString();
    this.currentTask.deadline = value.deadline.toString();
    this.currentTask.description = value.description;
    this.currentTask.assignedTo = this.tempAssignedTo;
    this.currentTask.assignedToName = this.tempAssignedToName;
    this.currentTask.status = value.status;
    this.currentTask.done = value.isDone;
    this.taskService.updateTask(this.currentTask);
  }
}
