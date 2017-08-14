import { Component, OnInit } from '@angular/core';
import { LoginService } from 'app/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(loginService: LoginService, private router: Router) {
    loginService.logout();
    this.router.navigateByUrl('/login');
   }

  ngOnInit() {
  }

}
