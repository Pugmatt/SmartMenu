import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import {DishService} from "./dish.service";

import { CreateDishComponent } from './create-dish/create-dish.component';

import { Dish } from "./dish"

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.css']
})
export class DishComponent implements OnInit {

  public dish: Dish;
  
  constructor(private dishService: DishService,
  private route: ActivatedRoute,
  private router: Router,
  public dialog: MatDialog) { }

  public error: String;

  ngOnInit() {
    this.dishService.getDish(this.route.snapshot.params.id)
    .subscribe(dish => { this.dish = dish; }, error => {
      console.log(error) 
      this.error = error.error;
    });
  }

  add() {
    let dialogRef = this.dialog.open(CreateDishComponent, {
    });
  }

  createRange(number){
    var items: number[] = [];
    for(var i = 1; i <= number; i++){
       items[i-1] = i;
    }
    return items;
  }

}
