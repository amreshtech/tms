import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { User } from 'app/users.model';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Injectable()
export class UserService {
  users: FirebaseListObservable<User[]>;
  private userPath = '/users';

  constructor(private db: AngularFireDatabase, private af: AngularFireAuth) {
    this.users = db.list('/users');
  }

  getCurrentUserDetails() {
    return this.af.authState;
  }

  addUserToFirebase(uid, displayName) {
    const userList = this.db.object(`users/${uid}`);
    const user: User = { 'displayName': '', 'uid': '' };
    user.displayName = this.capitalizeFirstLetter(displayName);
    user.uid = uid;
    userList.subscribe(data => {
      if (!data.$exists()) {
        this.db.object(`/users/${uid}`).set(user);
      }
    });
  }

  getAllUsers() {
    return this.users;
  }

  capitalizeFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1);
  }
}
