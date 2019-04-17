import { Component, Input, OnInit } from '@angular/core';

import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { CreateDishService } from './create-dish.service';
import {UserService} from "../../user.service";

import { Dish, Nutritional } from '../dish';

@Component({
  selector: 'app-create-dish',
  templateUrl: './create-dish.component.html',
  styleUrls: ['./create-dish.component.css']
})
export class CreateDishComponent implements OnInit {
  @Input() restaurant;

  constructor(public dialogRef: MatDialogRef<CreateDishComponent>,
    private router: Router,
    private userService: UserService,
    private dishService: CreateDishService) { }


  error: String;
  onSubmit(dish: NgForm) {
    const values = dish.form.value;
    if(values.name.length > 0 && values.description.length > 0 && values.category.length > 0) {
      if(!isNaN(values.price)) {
        console.log(this.userService.user);
        const dish: Dish = new Dish();
        dish.name = values.name;
        dish.price = values.price;
        dish.category = values.category;
        dish.description = values.description;
        dish.restaurant = this.userService.user.restaurant;
        if (values.calories || values.total_fat || values.sodium || values.cholesterol) {
          dish.nutritional = new Nutritional();
          if (values.calories)
            dish.nutritional.calories = values.calories;
          if (values.total_fat)
            dish.nutritional.total_fat = values.total_fat;
          if (values.sodium)
            dish.nutritional.sodium = values.sodium;
          if (values.cholesterol)
            dish.nutritional.cholesterol = values.cholesterol;
        }
        this.dishService.add(dish).subscribe(msg => {
          if (msg.error)
            this.error = msg.error;
          else {
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
              this.router.navigate(['/dish', msg.dish.id]));
            this.dialogRef.close();
          }
        }, error => {
          this.error = error.error;
        });
      }
      else
        this.error = "Price must be a number.";
    }
    else
      this.error = "Name, price, description, and category must be filled out.";
  }

  ngOnInit() {
  }

}
