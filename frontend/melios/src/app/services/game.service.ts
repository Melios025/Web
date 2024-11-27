import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  baseurl = "http://127.0.0.1:8000";
  httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })
  constructor(private http: HttpClient) { }
  getGameById(id: number): Observable<any> {
    return this.http.get(this.baseurl + '/games/' + id + '/', { headers: this.httpHeaders });
  }
  getPicturesByGameId(game_id: number): Observable<any>{
    return this.http.get(this.baseurl+'/'+game_id+'/pictures/',
    {headers :this.httpHeaders });
  }
}
