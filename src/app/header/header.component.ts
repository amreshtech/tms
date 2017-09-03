import { Component, OnInit } from '@angular/core';
import { LoginService } from 'app/login/login.service';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs/Observable';
import { AuthService } from 'app/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menuItems: Array<String> = [];
  currentUser: string;
  user: Observable<firebase.User>

  constructor(loginService: LoginService, private af: AngularFireAuth, private authService: AuthService) {
    // this.currentUser = loginService.getUser();
    this.user = af.authState;
    this.af.authState.subscribe(authState => {
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
