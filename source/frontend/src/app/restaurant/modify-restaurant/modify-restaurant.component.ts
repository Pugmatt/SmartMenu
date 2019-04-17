import {Component, Inject, Input, OnInit} from '@angular/core';

import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import {UserService} from "../../user.service";

import {Restaurant} from "../../restaurant";
import {RestaurantInfoService} from "../restaurant-info.service";

@Component({
  selector: 'app-modify-restaurant',
  templateUrl: './modify-restaurant.component.html',
  styleUrls: ['./modify-restaurant.component.css']
})
export class ModifyRestaurantComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModifyRestaurantComponent>,
              private router: Router,
              private userService: UserService,
              private restaurantInfoService: RestaurantInfoService,
              @Inject(MAT_DIALOG_DATA) public data: any) {

    this.restaurant = data.restaurant;
    this.name = this.restaurant.name;
    this.description = this.restaurant.description;
    this.state = this.restaurant.state;
    this.city = this.restaurant.city;
    this.zip = this.restaurant.zip;
    this.address = this.restaurant.address;
  }

  public restaurant: Restaurant;
  public name: string;
  public description: string;
  public state: string;
  public city: string;
  public zip: string;
  public address: string;


  error: String;
  onSubmit(dish: NgForm) {
    const values = dish.form.value;
    console.log(values)
    const valid = this.infoValid(values);
    if (valid === 'y') {
      this.restaurant.name = values.name;
      this.restaurant.description = values.description;
      this.restaurant.state = values.state;
      this.restaurant.city = values.city;
      this.restaurant.zip = values.zip;
      this.restaurant.address = values.address;
      this.restaurantInfoService.modify(this.restaurant).subscribe(msg => {
        if (msg.error)
          this.error = msg.error;
        else {
          this.dialogRef.close(this.restaurant);
        }
      }, error => {
        this.error = error.error;
      });
    }
    else
      this.error = valid;

  }

  infoValid(restaurant) {

      // Check if variables have correct lengths and properties
      if(restaurant.name.length < 3 || restaurant.name.length > 50)
        return "Company Name must greater than 3 and less than 50 characters";
      else if(restaurant.description.length < 0 || restaurant.description.length > 2000)
        return "Company description must greater than 0 and less than 2000 characters";
      else if(restaurant.state <= 1)
        return "Invalid state";
      else if(restaurant.city <= 1)
        return "Invalid city";
      else if(restaurant.zip <= 1 || !(/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(restaurant.zip)))
        return "Invalid zip code";
      else if(restaurant.address >= 1)
        return "Invalid address";

    return "y";
  }

  validInt(data) {
    return data === parseInt(data, 10);
  }
  ngOnInit() {

  }

}
