import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { Dish } from "./dish";

@Injectable({
  providedIn: 'root'
})
export class DishService {

  private url = 'api/dish';

  constructor(private http: HttpClient) { }

  // Retrieve list of dishes from API
  public getDish (id: number): Observable<Dish> {
    return this.http.get<Dish>(this.url + "/get/" + id);
  }

}
