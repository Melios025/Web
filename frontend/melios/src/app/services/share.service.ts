import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  currentUserSubscription?: Subscription;


  constructor() {
    const currentUserData = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User>(currentUserData ? JSON.parse(currentUserData) : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

}