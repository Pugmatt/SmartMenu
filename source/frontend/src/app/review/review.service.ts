import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';
import {Review} from "./review";
import {Dish} from "../dish/dish";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private url = 'api/dish/reviews';

  public user;

  constructor(private http: HttpClient) { }

  // Add new review to dish
  add (review: Review): Observable<ReviewResponse> {
    return this.http.post<ReviewResponse>(this.url + "/add", review, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  // Get reviews
  public getReviews (id: number): Observable<GetReviewsResponse> {
    return this.http.get<GetReviewsResponse>(this.url + "/get/" + id);
  }
}
export class GetReviewsResponse {
  error: string;
  reviews: Review[];
}

export class ReviewResponse {
  error: string;
  review: Review;
}
