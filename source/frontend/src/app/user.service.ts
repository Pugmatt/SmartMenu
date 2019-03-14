import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { User } from "./user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = 'api/user';

  constructor(private http: HttpClient) { }

  register (user: User): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(this.url + "/create", user, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }
}
export class RegisterResponse {
  error: String;
  user: User;
}