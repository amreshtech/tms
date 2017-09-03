import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { SignupService } from './signup.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'app/users.model';
import { AuthService } from 'app/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  username: AbstractControl;
  password: AbstractControl;
  message: string;
  returnUrl: string;
  user: Observable<firebase.User>;
  constructor(private fb: FormBuilder,
    private signupService: SignupService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    public af: AngularFireAuth) {

    this.signupForm = fb.group({
      'username': ['', Validators.required],
      'password': ['', [Validators.required, Validators.minLength(8)]]
    });

    this.username = this.signupForm.controls['username'];
    this.password = this.signupForm.controls['password'];
    this.user = af.authState;
  }

  ngOnInit() {
  }
  /* Traditional MySql signup*/
  /* signup({ username, password }: { username: string, password: string }): boolean {
    this.signupService.signup(username, password).subscribe(res => {
      alert('You have been registered.Please login.');
    }, err => {alert('User already exists.Please login.'); });
    this.router.navigateByUrl('/login');
    return false;
  } */

  /* Firebase based SignUp */
  signup({ username, password }: { username: string, password: string }) {
    this.authService.signup(username, password)
        .then( () => {this.router.navigateByUrl('/home'); })
        .catch( err => {this.message = err.message + ' Please Login.'});
  }

}
