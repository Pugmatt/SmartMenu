import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  resultsString: String;

  restaurants: Restaurant[];

  constructor(route: ActivatedRoute,
    private restaurantSearchService: RestaurantSearchService) {
    this.restaurant = route.snapshot.params.restaurant;
    this.location = route.snapshot.params.location;

    this.resultsString = " result(s) for ";
    if(!this.restaurant || this.restaurant == "all")
      this.resultsString += "\"" + this.location + "\"";
    else if(!this.location)
      this.resultsString += "\"" + this.restaurant + "\"";
    else
      this.resultsString += "\"" + this.restaurant + "\" in \"" + this.location + "\"";
  }

  searchRestaurants(query: String) {
    this.restaurantSearchService.getRestaurants(query)
    .subscribe(restaurants => this.restaurants = restaurants);
  }

  ngOnInit() {
    this.searchRestaurants(this.restaurant + " " + this.location);
  }

}
