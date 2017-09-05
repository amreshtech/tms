import { Component, OnInit } from '@angular/core';
import { LoginService } from 'app/login/login.service';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs/Observable';
import { AuthService } from 'app/auth.service';
import { UserService } from "app/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menuItems: Array<String> = [];
  currentUser: string;
  user: Observable<firebase.User>

  constructor(loginService: LoginService,
    private authService: AuthService,
    private userService: UserService) {
    // this.currentUser = loginService.getUser();
    this.userService.getCurrentUserDetails().subscribe(authState => {
      if (authState) {
        this.currentUser = (authState.displayName != null) ? authState.displayName.split(' ')[0] : authState.email.split('@')[0];
      }});
   }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }
}
