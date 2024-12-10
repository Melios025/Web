import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  public currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;
  currentUserSubscription?: Subscription;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Kiểm tra nếu đang chạy trong trình duyệt
    if (isPlatformBrowser(this.platformId)) {
      const currentUserData = localStorage.getItem('currentUser');
      this.currentUserSubject = new BehaviorSubject<User | null>(
        currentUserData ? JSON.parse(currentUserData) : null
      );
    } else {
      // Nếu không phải trình duyệt, khởi tạo với null
      this.currentUserSubject = new BehaviorSubject<User | null>(null);
    }
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }
}
