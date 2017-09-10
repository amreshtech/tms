import { Component, OnInit } from '@angular/core';
import { TaskService } from 'app/task.service';
import { Task } from 'app/tasks.model';
import { UserService } from 'app/user.service';

@Component({
  selector: 'app-all-task-assigned-to-you',
  templateUrl: './all-task-assigned-to-you.component.html',
  styleUrls: ['./all-task-assigned-to-you.component.css']
})
export class AllTaskAssignedToYouComponent implements OnInit {
  tasks: Array<Task>;
  uid: string;
  constructor(private taskService: TaskService, private userService: UserService) {
    this.userService.getCurrentUserDetails().subscribe(res => this.uid = res.uid);
    this.taskService.TasksByUser(this.uid).subscribe(res => this.tasks = res);
  }

  ngOnInit() {
  }
}
