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
  public getRestaurants (query: String, page: number): Observable<SearchResponse> {
    const url = this.fullUrl + '/' + query + '/' + page;
    return this.http.get<SearchResponse>(url);
  }
}
export class SearchResponse {
  pageCount: number;
  total: number;
  restaurants: Restaurant[];
}