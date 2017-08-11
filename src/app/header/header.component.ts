import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menuItems: Array<String> = [];

  constructor() {
    this.menuItems.push('create task');
    this.menuItems.push('all tasks');
   }

  ngOnInit() {
  }

}
