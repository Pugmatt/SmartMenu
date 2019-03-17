import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';
import { User } from "./user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = 'api/user';

  public user;

  constructor(private http: HttpClient) { }

  register (user: User): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(this.url + "/create", user, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  login (user: User): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(this.url + "/login", user, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  get (): Observable<RegisterResponse> {
    return this.http.get<RegisterResponse>(this.url + "/get");
  }

  logout (): Observable<RegisterResponse> {
    return this.http.get<RegisterResponse>(this.url + "/logout");
  }
}
export class RegisterResponse {
  error: String;
  user: User;
}