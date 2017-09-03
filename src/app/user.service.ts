import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { User } from 'app/users.model';

@Injectable()
export class UserService {
  users: FirebaseListObservable<User[]>;
  private userPath = '/users';
  constructor(private db: AngularFireDatabase) {
    this.users = db.list('/users');
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
