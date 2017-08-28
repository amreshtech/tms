import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-google-login',
  templateUrl: './google-login.component.html',
  styleUrls: ['./google-login.component.css']
})
export class GoogleLoginComponent implements OnInit {
  user: Observable<firebase.User>;
  constructor(private authService: AuthService, public af: AngularFireAuth) {
    this.user = af.authState;
   }

  ngOnInit() {
  }

  login() {
    this.authService.loginGoogle();
  }

  logout() {
    this.authService.logout();
  }

}
