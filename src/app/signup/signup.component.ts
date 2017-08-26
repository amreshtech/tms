import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { SignupService } from './signup.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'app/users.model';


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

  constructor(private fb: FormBuilder, private signupService: SignupService, private route: ActivatedRoute, private router: Router) {
    this.signupForm = fb.group({
      'username': ['', Validators.required],
      'password': ['', [Validators.required, Validators.minLength(8)]]
    });

    this.username = this.signupForm.controls['username'];
    this.password = this.signupForm.controls['password'];
    this.message = '';
  }

  ngOnInit() {
  }

  signup({ username, password }: { username: string, password: string }): boolean {
    this.signupService.signup(username, password).subscribe(res => {
      alert('You have been registered.Please login.');
    }, err => {alert('User already exists.Please login.'); });
    this.router.navigateByUrl('/login');
    return false;
  }
}
