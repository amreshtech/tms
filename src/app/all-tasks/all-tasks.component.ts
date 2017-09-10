import { Component, OnInit } from '@angular/core';
import { TaskService } from 'app/task.service';
import { Task } from 'app/tasks.model';

@Component({
  selector: 'app-all-tasks',
  templateUrl: './all-tasks.component.html',
  styleUrls: ['./all-tasks.component.css']
})
export class AllTasksComponent implements OnInit {
  tasks: Array<Task>;
  constructor(private taskService: TaskService) { }

  ngOnInit() {
  }
  getAllTask() {
    this.taskService.getAllTasks().subscribe(res => this.tasks = res);
  }
}
