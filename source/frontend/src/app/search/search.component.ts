import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import {Restaurant} from "../restaurant";

import {RestaurantSearchService} from "./restaurant-search.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  restaurant: String;
  location: String;
  page: number;
  resultsString: String;

  restaurants: Restaurant[];
  pages: number;
  total: number;

  constructor(route: ActivatedRoute,
    private router: Router,
    private restaurantSearchService: RestaurantSearchService) {
    this.restaurant = route.snapshot.params.restaurant;
    this.location = route.snapshot.params.location;
    this.page = route.snapshot.params.page;

    this.resultsString = " result(s) for ";
    if(!this.restaurant || this.restaurant == "all")
      this.resultsString += "\"" + this.location + "\"";
    else if(!this.location || this.location == "all")
      this.resultsString += "\"" + this.restaurant + "\"";
    else
      this.resultsString += "\"" + this.restaurant + "\" in \"" + this.location + "\"";
  }

  searchRestaurants(query: String, page: number) {
    this.restaurantSearchService.getRestaurants(query, page)
    .subscribe(result => {
      this.restaurants = result.restaurants;
      this.pages = result.pageCount;
      this.total = result.total;
    });
  }

  next() {
    this.router.navigate(['/search', !this.restaurant ? "all" : this.restaurant, !this.location ? "all" : this.location, ++this.page]);
    this.searchRestaurants(this.restaurant + " " + this.location, this.page);
  }

  back() {
    this.router.navigate(['/search', !this.restaurant ? "all" : this.restaurant, !this.location ? "all" : this.location, --this.page]);
    this.searchRestaurants(this.restaurant + " " + this.location, this.page);
  }

  ngOnInit() {
    this.searchRestaurants(this.restaurant + " " + this.location, this.page);
  }

}
