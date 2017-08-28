import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { LoginService } from './login/login.service';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class LoggedInGuard implements CanActivate {
  user: Observable<firebase.User>;

  constructor(private loginService: LoginService,
    private router: Router,
    private af: AngularFireAuth) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      /* Traditional AuthGuard */
      /* const isLoggedIn = this.loginService.isLoggedIn();
      if ( isLoggedIn) {
        return isLoggedIn;
      }

      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
      return false; */

      /* Firebase AuthGuard */
      return this.af.authState
      .take(1)
      .map(authState => !!authState)
      .do(af => !af ? this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }}) : true)
  }
}
