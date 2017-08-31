import { Component, OnInit } from '@angular/core';
import { PasswordModule } from 'primeng/primeng';
import { InputTextModule } from 'primeng/primeng';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs/Observable';
import { FirebaseListObservable } from "angularfire2/database";
import { User } from "app/users.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  username: AbstractControl;
  password: AbstractControl;
  message: string;
  returnUrl: string;
  user: Observable<firebase.User>;
  users: FirebaseListObservable<User[]>;
  constructor(private fb: FormBuilder,
    public loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private af: AngularFireAuth) {
    this.loginForm = fb.group({
      'username': ['', Validators.required],
      'password': ['', [Validators.required, Validators.minLength(8)]]
    });

    this.username = this.loginForm.controls['username'];
    this.password = this.loginForm.controls['password'];
    this.message = '';
    this.user = af.authState;
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  /* Traditional MySql login*/
  /* login({ username, password }: { username: string, password: string }): boolean {
    this.message = '';
    this.loginService.login(username, password).subscribe(res => {
        localStorage.setItem('username', username);
        this.router.navigateByUrl(this.returnUrl);
      }, err => {this.message = 'Invalid Credentials';}
    );
    return false;
  } */

  /* Firebase based Login*/
  login({ username, password }: { username: string, password: string }) {
    this.authService.loginEmail(username, password)
    .then(() => { this.router.navigateByUrl(this.returnUrl); })
    .catch( err => { this.message = err.message; });
  }

  loginGoogle() {
    this.authService.loginGoogle()
    .then(() => { this.router.navigateByUrl(this.returnUrl); })
    .catch( err => { this.message = err.message; });
  }

  /* Firebase based Logout*/
  logout() {
    this.authService.logout();
  }
  /* Traditional MySql logout*/
  /* logout(): boolean {
    this.loginService.logout();
    return true;
  } */
}
