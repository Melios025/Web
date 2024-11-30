import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SharedService } from './share.service';

@Injectable({
  providedIn: 'root'
})
  export class AuthenticationService {
    baseurl = 'http://127.0.0.1:8000'
    constructor(private http: HttpClient, public shServ: SharedService) { }
    register(username: string, email: string, password: string) {
      return this.http.post(this.baseurl + '/register/', { username, email, password });
    }
  }
