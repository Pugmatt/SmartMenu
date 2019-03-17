import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent  {

  comment1:string;  
  example1: string;
  constructor() {
    this.comment1 = 'It has an excellent service';
    this.example1 = 'Bar Louie';

   }


}
