import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { TaskService } from 'app/task.service';
import { UserService } from 'app/user.service';
import { Task } from 'app/tasks.model';
declare var $: any;

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit, OnChanges {

  @Input() taskid: string;
  taskDetailsForm: FormGroup;
  name: AbstractControl;
  createdDate: AbstractControl;
  assignedBy: AbstractControl;
  assignedTo: AbstractControl;
  description: AbstractControl;
  deadline: AbstractControl;
  tempAssignedToName: string;
  tempAssignedTo: string;
  editButton: string;

  constructor(private taskService: TaskService,
    private userService: UserService,
    private fb: FormBuilder ) {
      this.editButton = 'Edit';
    this.taskDetailsForm = fb.group({
      'name': ['', Validators.required],
      'createdDate': ['', Validators.required],
      'assignedByName': ['', Validators.required],
      'assignedBy': ['', Validators.required],
      'assignedToName': ['', Validators.required],
      'assignedTo': ['', Validators.required],
      'description': ['', Validators.required],
      'deadline': ['', Validators.required]
    });

    this.name = this.taskDetailsForm.controls['name'];
    this.createdDate = this.taskDetailsForm.controls['createdDate'];
    this.assignedBy = this.taskDetailsForm.controls['assignedBy'];
    this.assignedTo = this.taskDetailsForm.controls['assignedTo'];
    this.description = this.taskDetailsForm.controls['description'];
    this.deadline = this.taskDetailsForm.controls['deadline'];

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
    const id = changes.taskid.currentValue;
    this.taskService.getTask(id).subscribe(res => {
      this.name.setValue(res.name);
      this.createdDate.setValue(new Date(res.createdDate));
      this.assignedBy.setValue(res.assignedByName);
      this.assignedTo.setValue(res.assignedToName);
      this.description.setValue(res.description);
      this.deadline.setValue(new Date(res.deadline));
    });
  }
}
