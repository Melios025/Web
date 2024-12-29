import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SendmailService {
  baseurl = 'http://127.0.0.1:8000'
  httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })
  constructor(private http: HttpClient) { }
  sendMail(email: string, game_id: string[]) {
    // const body = {recipient: email, game_id: game_id}
    return this.http.post(
      this.baseurl + '/user/sendmail/', {recipient: email, game_id: game_id}, {
      headers: this.httpHeaders
    }
    )
  }
}
