import { Component, OnInit } from '@angular/core';
import {NavigationService} from "../navigation.service";
import {RestaurantListService} from "../restaurant-list.service";
import {Restaurant} from "../restaurant";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  restaurants: Restaurant[];

  constructor(private restaurantListService: RestaurantListService) { }

  ngOnInit() {
    // Retrieve list of restaurants on creation of home component
    this.restaurantListService.getRestaurants()
      .subscribe(restaurants => this.restaurants = restaurants);
  }

}
