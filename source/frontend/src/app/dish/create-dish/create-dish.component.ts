import { Component, Input, OnInit } from '@angular/core';

import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { CreateDishService } from './create-dish.service';
import {UserService} from "../../user.service";

import { Dish } from '../dish';

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
    if(values.name.length > 0 && values.category.length > 0) {
      console.log(this.userService.user);
      const dish: Dish = new Dish();
      dish.name = values.name;
      dish.category = values.category;
      dish.description = values.description;
      dish.restaurant = this.userService.user.restaurant;
      this.dishService.add(dish).subscribe(msg => {
        if(msg.error)
          this.error = msg.error;
        else {
          this.dialogRef.close();
        }
      }, error => {
        this.error = error.error;
      });
    }

    console.log(dish); 
  }

  ngOnInit() {
  }

}
