import {Component, Inject, Input, OnInit} from '@angular/core';

import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ModifyDishService } from './modify-dish.service';
import {UserService} from "../../user.service";

import { Dish } from '../dish';

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
    this.description = this.dish.description;
    this.category = this.dish.category;
  }

  public dish: Dish;
  public name: string;
  public description: string;
  public category: string;


  error: String;
  onSubmit(dish: NgForm) {
    const values = dish.form.value;
    if (values.name.length > 0 && values.category.length > 0) {
      console.log(this.userService.user);
      this.dish.name = values.name;
      this.dish.category = values.category;
      this.dish.description = values.description;
      this.dish.restaurant = this.userService.user.restaurant;
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
      this.error = "Name and category must be filled out.";

    console.log(dish);
  }

  ngOnInit() {

  }

}
