import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { LoginService } from './login/login.service';

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const isLoggedIn = this.loginService.isLoggedIn();
      if ( isLoggedIn) {
        return isLoggedIn;
      }

      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
      return false;
  }
}
