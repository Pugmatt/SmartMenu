import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { Restaurant } from "../restaurant";
import {Dish} from "../dish/dish";

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

  public getDishes (id: number): Observable<CategorizedDishes[]> {
    return this.http.get<CategorizedDishes[]>(this.url + "/dishes/" + id);
  }

}

export class CategorizedDishes {
  name: string;
  dishes: Dish[];
}


