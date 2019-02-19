import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-restaurant-element',
  templateUrl: './restaurant-element.component.html',
  styleUrls: ['./restaurant-element.component.css']
})
export class RestaurantElementComponent implements OnInit {
  @Input() restaurant;

  constructor() { }

  ngOnInit() {
  }

}
