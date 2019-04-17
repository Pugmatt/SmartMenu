import {Component, Inject, Input, OnInit} from '@angular/core';

import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ModifyDishService } from './modify-dish.service';
import {UserService} from "../../user.service";

import {Dish, Nutritional} from '../dish';

@Component({
  selector: 'app-modify-dish',
  templateUrl: './modify-dish.component.html',
  styleUrls: ['./modify-dish.component.css']
})
export class ModifyDishComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModifyDishComponent>,
              private router: Router,
              private userService: UserService,
              private dishService: ModifyDishService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.dish = data.dish;
    this.name = this.dish.name;
    this.price = this.dish.price;
    this.description = this.dish.description;
    this.category = this.dish.category;
    this.calories = this.dish.nutritional.calories;
    this.total_fat = this.dish.nutritional.total_fat;
    this.sodium = this.dish.nutritional.sodium;
    this.cholesterol = this.dish.nutritional.cholesterol;
  }

  public dish: Dish;
  public name: string;
  public price: number;
  public description: string;
  public category: string;
  public calories: number;
  public total_fat: number;
  public sodium: number;
  public cholesterol: number;


  error: String;
  onSubmit(dish: NgForm) {
    const values = dish.form.value;
    if (values.name.length > 0 && values.category.length > 0) {
      if(!isNaN(values.price)) {
        this.dish.name = values.name;
        this.dish.price = values.price;
        this.dish.category = values.category;
        this.dish.description = values.description;
        this.dish.restaurant = this.userService.user.restaurant;
        if (values.calories || values.total_fat || values.sodium || values.cholesterol) {
          this.dish.nutritional = new Nutritional();
          if (values.calories && this.validInt(values.calories))
            this.dish.nutritional.calories = values.calories;
          if (values.total_fat && this.validInt(values.total_fat))
            this.dish.nutritional.total_fat = values.total_fat;
          if (values.sodium && this.validInt(values.sodium))
            this.dish.nutritional.sodium = values.sodium;
          if (values.cholesterol && this.validInt(values.cholesterol))
            this.dish.nutritional.cholesterol = values.cholesterol;
        }
        this.dishService.modify(this.dish).subscribe(msg => {
          if (msg.error)
            this.error = msg.error;
          else {
            this.dialogRef.close(this.dish);
          }
        }, error => {
          this.error = error.error;
        });
      }
      else
        this.error = "Price must be a number.";
    }
    else
      this.error = "Name and category must be filled out.";

  }
  validInt(data) {
    return data === parseInt(data, 10);
  }
  ngOnInit() {

  }

}
