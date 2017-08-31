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

  getAll(): FirebaseListObservable<User[]> {
    return this.db.list('/users');
  }

  addUserToFirebase(uid, displayName) {
    this.getAll();
    const user: User = { 'displayName': '', '$uid': '' };
    user.displayName = displayName;
    user.$uid = uid;
    this.users.push(user);
  }
}
