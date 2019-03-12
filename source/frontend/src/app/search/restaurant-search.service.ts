import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';
import {Restaurant} from "../restaurant";

@Injectable({
  providedIn: 'root'
})
export class RestaurantSearchService {

  private fullUrl = 'api/restaurants';
  
  constructor(private http: HttpClient) { }
  
  // Retrieve list of restaurants from API
  public getRestaurants (query: String): Observable<Restaurant[]> {
    const url = this.fullUrl + '/' + query;
    return this.http.get<Restaurant[]>(url);
  }
}
