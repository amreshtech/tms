import { Injectable } from '@angular/core';

@Injectable()
export class LoginService {
  login(user: string, password: string): boolean {
    if (user === 'amresh' && password === 'mishra123') {
      localStorage.setItem('username', user);
      return true;
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
}
