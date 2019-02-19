import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from "rxjs";
import {Restaurant} from "./restaurant";

@Injectable({
  providedIn: 'root'
})
export class RestaurantListService {

  private url = 'api/restaurants';

  constructor(private http: HttpClient) { }

  public getRestaurants (): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(this.url)
  }

}
