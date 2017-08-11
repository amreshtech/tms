import { Component, OnInit } from '@angular/core';
import { PasswordModule } from 'primeng/primeng';
import { InputTextModule } from 'primeng/primeng';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  username: AbstractControl;
  password: AbstractControl;

  constructor(fb: FormBuilder) {
    this.loginForm = fb.group({
      'username': ['', Validators.required]
    });

    this.username = this.loginForm.controls['username'];
  }

  ngOnInit() {
  }

  onSubmit(value: string): void {
    console.log('you submitted value: ', value);
  }
}
