import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { Restaurant } from "../restaurant";

@Injectable({
  providedIn: 'root'
})
export class RestaurantInfoService {

  private url = 'api/restaurants';

  constructor(private http: HttpClient) { }

  // Retrieve list of restaurants from API
  public getRestaurant (id: number): Observable<Restaurant> {
    return this.http.get<Restaurant>(this.url + "/get/" + id);
  }

}
