import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GamesService {


  baseurl = "http://127.0.0.1:8000";
  httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })
  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<any> {
    return this.http.get(this.baseurl + '/games/',
      { headers: this.httpHeaders });
  }
  getProductById(id: number){
    return this.http.get(this.baseurl+'/games/'+id+'/',
    {headers :this.httpHeaders });
  }
}