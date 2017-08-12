import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  tasks: Array<object> = [];
  constructor() {
    this.tasks.push({'name': 'task1', 'date': '28-jan-2017', 'assigned-by': 'Amresh', 'assigned-to': 'Paresh'});
    this.tasks.push({'name': 'task2', 'date': '8-feb-2017', 'assigned-by': 'Paresh', 'assigned-to': 'Amresh'});
   }

  ngOnInit() {
  }

}
