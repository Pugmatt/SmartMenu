import { Component, OnInit } from '@angular/core';

import { CreateDishComponent } from './create-dish/create-dish.component'

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.css']
})
export class DishComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    
  }

  add() {
    let dialogRef = this.dialog.open(CreateDishComponent, {
      
    });
  }
}
