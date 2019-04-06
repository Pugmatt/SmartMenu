import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { DishService } from "./dish.service";
import { UserService } from "../user.service";

import{ReviewService} from "../review/review.service";

import { CreateDishComponent } from './create-dish/create-dish.component';

import { UploaderComponent } from '../uploader/uploader.component';

import { ReviewComponent } from '../review/review.component';

import { Dish } from "./dish";

import {Review} from "../review/review";

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.css']
})
export class DishComponent implements OnInit {

  public dish: Dish;
  public reviews: Review[];
  
  constructor(private dishService: DishService,
  private userService: UserService,
  private reviewService: ReviewService,
  private route: ActivatedRoute,
  private router: Router,
  private http: HttpClient,

  public dialog: MatDialog) { }

  public error: String;

  public currentImage: number = 1;

  ngOnInit() {
    this.dishService.getDish(this.route.snapshot.params.id)
    .subscribe(dish => { this.dish = dish; }, error => {
      console.log(error) 
      this.error = error.error;
    });


    this.reviewService.getReviews(this.route.snapshot.params.id)
    .subscribe(review => { this.reviews = review.reviews;}, error => {
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

  removeImage() {
    this.http.post("/api/dish/removeImage", {image: this.currentImage, dish: this.dish}, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })}).subscribe(msg => {});
    }

    uploader() {
      const root = this;
      let dialogRef = this.dialog.open(UploaderComponent, {
        data: { directory: 'dish', id: this.route.snapshot.params.id, cb: function(status) {
          if (status.status === 200) {
            root.currentImage = 2;
            root.currentImage = 1;
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
