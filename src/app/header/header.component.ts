import { Component, OnInit } from '@angular/core';
import { LoginService } from 'app/login/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menuItems: Array<String> = [];
  currentUser: string;

  constructor(loginService: LoginService) {
    this.currentUser = loginService.getUser();
   }

  ngOnInit() {
  }

}
