import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroment/environments';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = environment.url + "/users";
  constructor(private http: HttpClient) { }

  getUserByEmail(email: string): Observable<any>{
    return this.http.get(this.url+'/'+email);
  }

  saveUser(user: any):Observable<any>{
    return this.http.post(this.url, user);
  }
}