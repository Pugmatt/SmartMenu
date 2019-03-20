import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { DishService } from "./dish.service";
import { UserService } from "../user.service";

import { CreateDishComponent } from './create-dish/create-dish.component';

import { UploaderComponent } from '../uploader/uploader.component';

import { ReviewComponent } from '../review/review.component';

import { Dish } from "./dish";

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.css']
})
export class DishComponent implements OnInit {

  public dish: Dish;
  
  constructor(private dishService: DishService,
  private userService: UserService,
  private route: ActivatedRoute,
  private router: Router,
  public dialog: MatDialog) { }

  public error: String;

  public currentImage: number = 1;

  ngOnInit() {
    this.dishService.getDish(this.route.snapshot.params.id)
    .subscribe(dish => { this.dish = dish; }, error => {
      console.log(error) 
      this.error = error.error;
    });
  }

  // Change image based on selection
  changeImage(index: number) {
    this.currentImage = index;
  }

  // Return API url based on image index
  getUrl(index: number) {
    return 'url(/api/images/dish/' + this.dish.id + '/' + (index+1) + ')';
  }

  add() {
    let dialogRef = this.dialog.open(CreateDishComponent, {});
  }

  review() {
    let dialogRef = this.dialog.open(ReviewComponent, {
      data: { id: this.route.snapshot.params.id }
    });
  }

  uploader() {
    const root = this;
    let dialogRef = this.dialog.open(UploaderComponent, {
      data: { directory: 'dish', id: this.route.snapshot.params.id, cb: function(status) {
        if (status.status === 200) {
            location.reload();
            root.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
              root.router.navigate(['/dish', root.route.snapshot.params.id]));
        }
      }}
    });
  }

  // Create range for gallery looping through {{disk.images}} images
  createRange(number){
    var items: number[] = [];
    for(var i = 1; i <= number; i++){
       items[i-1] = i;
    }
    return items;
  }

}
