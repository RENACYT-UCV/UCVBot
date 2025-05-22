import { Injectable } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  User,
  UserCredential,
  signInWithPopup,
  signOut,
  user,
} from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private user$: Observable<User | null> = user(this.auth);

  constructor(private auth: Auth) {}

  login(): Promise<UserCredential> {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  logout(): Promise<any> {
    return signOut(this.auth);
  }

  get user(): Observable<User | null> {
    return this.user$;
  }
}
