import { Injectable, Input } from '@angular/core';
import { User } from 'app/users.model';

@Injectable()
export class SignupService {
  user: User;
  users: Array<User>;
  existingUser: any;

  constructor() {
    this.user = new User();
    if (localStorage.getItem('users')) {
      this.users = JSON.parse(localStorage.getItem('users'));
    } else {
      this.users = [];
    }
  }

  signup(user: string, password: string): boolean {
    const isExist = this.doesExist(user);
    if (!isExist) {
      this.user.username = user;
      this.user.password = password;
      this.users.push(this.user);
      localStorage.setItem('users', JSON.stringify(this.users));
      return true;
    } else { return false; }
  }

  doesExist(user: string): boolean {
    if (localStorage.getItem('users')) {
      for (const i of JSON.parse(localStorage.getItem('users'))) {
        if (i.username === user) {
          return true;
        }
      }
    } else { return false; }
  }
}
