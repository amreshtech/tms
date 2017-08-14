import { Injectable } from '@angular/core';
import { User } from 'app/users.model';

@Injectable()
export class LoginService {
  login(user: string, password: string): boolean {
    const isExist = this.doesExist(user);
    if (isExist) {
      const userDetail = this.getUserDetails(user);
      if (user === userDetail.username && password === userDetail.password) {
        localStorage.setItem('username', user);
        return true;
      }
    }
    return false;
  }

  logout(): any {
    localStorage.removeItem('username');
  }

  getUser(): any {
    return localStorage.getItem('username');
  }

  isLoggedIn(): boolean {
    return this.getUser() !== null;
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

  getUserDetails(user: string): User {
    for (const i of JSON.parse(localStorage.getItem('users'))) {
      if (i.username === user) {
        return i;
      }
    }
  }
}
