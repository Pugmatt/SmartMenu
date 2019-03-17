import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import {RestaurantInfoService} from "./restaurant-info.service";

import { Restaurant } from "../restaurant"

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {

  public restaurant: Restaurant;
  
  constructor(private restaurantInfoService: RestaurantInfoService,
  private route: ActivatedRoute,
  private router: Router,) { }

  ngOnInit() {
    this.restaurantInfoService.getRestaurant(this.route.snapshot.params.id)
    .subscribe(restaurant => this.restaurant = restaurant);
  }

}
