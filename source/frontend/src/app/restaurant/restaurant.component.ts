import {Component, OnInit, ViewChild} from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import {RestaurantInfoService} from "./restaurant-info.service";
import { UserService } from "../user.service";

import { CreateDishComponent } from '../dish/create-dish/create-dish.component';
import { UploaderComponent } from '../uploader/uploader.component';

import { Restaurant } from "../restaurant"
import { Dish } from "../dish/dish";
import {NgModel} from "@angular/forms";

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {

  public restaurant: Restaurant;
  public categories;

  @ViewChild('search') search: NgModel;
  
  constructor(private restaurantInfoService: RestaurantInfoService,
  public userService: UserService,
  private route: ActivatedRoute,
  private router: Router,
  public dialog: MatDialog) { }


  public organizedDishes: Dish[] = [];

  ngOnInit() {
    this.restaurantInfoService.getRestaurant(this.route.snapshot.params.id)
    .subscribe(restaurant => this.restaurant = restaurant);

    this.restaurantInfoService.getDishes(this.route.snapshot.params.id)
      .subscribe(categories => {
        this.categories = categories; 
        for(var i=0;i<this.categories.length;i++)
        {
            for(var j=0; j<this.categories[i].dishes.length;j++)
            {
              this.organizedDishes.push(this.categories[i].dishes[j]);
            }
        }
        this.organizedDishes.sort(function(a,b){return a.rating-b.rating});
      
      });
    
  }

  uploader() {
    const root = this;
    let dialogRef = this.dialog.open(UploaderComponent, {
      data: { directory: 'restaurant', id: this.route.snapshot.params.id, cb: function(status) {
          if (status.status === 200) {
            location.reload();
            root.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
              root.router.navigate(['/restaurant', root.route.snapshot.params.id]));
          }
        }}
    });
  }

  addDishes() {
    let dialogRef = this.dialog.open(CreateDishComponent, {});
  }

  containsSearchTerms(dishes: Dish[]) {
    if (!this.search)
      return dishes;

    let finalDishes = [];
    let terms = (<string><any>this.search).split(' ');
    for (let i = 0; i < dishes.length; i++) {
      let contains = false;
      for (let t = 0; t < terms.length; t++) {
        if (dishes[i].name.toLowerCase().indexOf(terms[t].toLowerCase()) != -1) {
          contains = true;
          break;
        }
      }
      if (contains)
        finalDishes.push(dishes[i]);
    }

    return finalDishes;
    
  }

}
