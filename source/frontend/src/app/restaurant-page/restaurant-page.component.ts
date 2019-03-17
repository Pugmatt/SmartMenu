import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-restaurant-page',
  templateUrl: './restaurant-page.component.html',
  styleUrls: ['./restaurant-page.component.css']
})
export class RestaurantPageComponent  {

  comment1:string;  
  example1: string;
  constructor() {
    this.comment1 = 'It has an excellent service';
    this.example1 = 'Bar Louie';

   }


}
