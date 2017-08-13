import { Component, OnInit, Output } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  tasks: Array<object> = [];

  constructor() {
    if (!localStorage.getItem('tasks')) {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    } else {
      this.tasks = JSON.parse(localStorage.getItem('tasks'));
    }
  }

  ngOnInit() {
  }

  showModal(): boolean {
    $('.ui.basic.modal').modal('show');
    return false;
  }
}
