import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs/Observable';
@Injectable()
export class AuthService {

  constructor(public af: AngularFireAuth) { }

  signup(username: string, password: string) {
    return this.af.auth.createUserWithEmailAndPassword(username, password);
  }

  loginEmail(username: string, password: string) {
    return this.af.auth.signInWithEmailAndPassword(username, password);
  }

  loginGoogle() {
    return this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.af.auth.signOut();
  }
}
