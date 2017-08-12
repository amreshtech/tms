import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  tasks: Array<object> = [];
  constructor(private router: Router) {
    this.tasks.push({
      'name': 'task1',
      'createdDate': '28-Jan-2017',
      'assignedBy': 'Amresh',
      'assignedTo': 'Paresh',
      'description': 'Implement Semantic UI',
      'deadline': '19-Feb-2017'
    });
    this.tasks.push({
      'name': 'task2',
      'createdDate': '8-Feb-2017',
      'assignedBy': 'Paresh',
      'assignedTo': 'Amresh',
      'description': 'Implement Spring Boot',
      'deadline': '30-Mar-2017'
    });
   }

  ngOnInit() {
  }

  showModal(): boolean {
    $('.ui.basic.modal').modal('show');
    return false;
  }
}
