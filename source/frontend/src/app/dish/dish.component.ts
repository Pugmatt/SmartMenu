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

  public currentImage: string;

  ngOnInit() {
    this.dishService.getDish(this.route.snapshot.params.id)
    .subscribe(dish => {
      this.dish = dish;
         if(dish.images.length > 0)
          this.currentImage = dish.images[0];
         else
           this.currentImage = 'default.png';
      }, error => {
      console.log(error) ;
      this.error = error.error;
    });


    this.reviewService.getReviews(this.route.snapshot.params.id)
    .subscribe(review => { this.reviews = review.reviews;}, error => {
      console.log(error) 
      this.error = error.error;
    });

  }

  // Change image based on selection
  changeImage(image: string) {
    this.currentImage = image;
  }

  // Return API url based on image
  getUrl(image: string) {
    return 'url(/api/images/dish/' + this.dish.id + '/' + image + ')';
  }

  add() {
    let dialogRef = this.dialog.open(CreateDishComponent, {});
  }

  remove() {
    if (confirm('Are you sure you want to remove this dish?')) {
      const root = this;
      this.dishService.removeDish(this.route.snapshot.params.id)
        .subscribe(msg => {
          if (msg.error) {
            alert(msg.error);
          } else if (msg.success) {
            root.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
              root.router.navigate(['/restaurant', root.dish.restaurant]));
          }
        }, error => {
          console.log(error)
          this.error = error.error;
        });
    }
  }

  review() {
    let dialogRef = this.dialog.open(ReviewComponent, {
      data: { id: this.route.snapshot.params.id }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.reviewService.getReviews(this.route.snapshot.params.id)
          .subscribe(review => {
            this.reviews = review.reviews;
          }, error => {
            console.log(error)
            this.error = error.error;
          });
      }
    });
  }

  removeImage() {
    if (confirm('Are you sure you want to remove this image?')) {
      const root = this;
      this.http.post<RemoveImageResponse>("/api/dish/removeImage", {image: this.currentImage, dish: this.dish}, {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
      }).subscribe(msg  => {
        if (msg.success) {
          root.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
            root.router.navigate(['/dish', root.route.snapshot.params.id]));
        }
        else if (msg.error) {
          alert(msg.error);
        }
      });
    }
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

export class RemoveImageResponse {
  success: boolean;
  error: string;
}
