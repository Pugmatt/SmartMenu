import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';

import { Dish } from '../dish';

import { FormsModule, NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ModifyDishService {

  url: String = "/api/dish"
  constructor(private http: HttpClient) { }

  modify (dish: Dish): Observable<DishResponse> {
    return this.http.post<DishResponse>(this.url + "/modify", dish, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }
}

export class DishResponse {
  error: String;
  dish: Dish;
}
