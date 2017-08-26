import { Component, OnInit } from '@angular/core';
import { PasswordModule } from 'primeng/primeng';
import { InputTextModule } from 'primeng/primeng';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(private fb: FormBuilder, public loginService: LoginService, private route: ActivatedRoute, private router: Router) {
    this.loginForm = fb.group({
      'username': ['', Validators.required],
      'password': ['', [Validators.required, Validators.minLength(8)]]
    });

    this.username = this.loginForm.controls['username'];
    this.password = this.loginForm.controls['password'];
    this.message = '';
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login({ username, password }: { username: string, password: string }): boolean {
    this.message = '';
    this.loginService.login(username, password).subscribe(res => {
        localStorage.setItem('username', username);
        this.router.navigateByUrl(this.returnUrl);
      }, err => {this.message = 'Invalid Credentials';}
    );
    return false;
  }

  logout(): boolean {
    this.loginService.logout();
    return true;
  }
}
