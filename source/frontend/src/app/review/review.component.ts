import {Component, Inject, OnInit} from '@angular/core';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormsModule, NgForm } from '@angular/forms';
import {User} from "../user";

import { ReviewService } from './review.service';
import {UserService} from "../user.service";
import {Review} from "./review";

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  ratingNumber = 5;

  error: string;

  constructor(public dialogRef: MatDialogRef<ReviewComponent>,
              private userService: UserService,
              private reviewService: ReviewService,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  rating(num: number) {
    this.ratingNumber = num;
  }

  onSubmit(form: NgForm) {
    const values = form.form.value;
    let comment = values.comment;

    if(comment && comment.length > 0) {
      let review = new Review();
      review.comment = comment;
      review.rating = this.ratingNumber;
      review.dish = this.data.id;

      this.reviewService.add(review).subscribe(msg => {
        if(msg.error)
          this.error = msg.error;
        else {
          this.dialogRef.close();
        }
      }, error => {
        this.error = error.error;
      });
    }
  }

}
