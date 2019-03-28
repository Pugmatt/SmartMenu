import { Component, OnInit } from '@angular/core';

export interface NutritionalFacts {
  type: string;
  amount: number;
  percent: number;
}

@Component({
  selector: 'app-nutritional-facts',
  templateUrl: './nutritional-facts.component.html',
  styleUrls: ['./nutritional-facts.component.css']
})
export class NutritionalFactsComponent implements OnInit {

  ELEMENT_DATA: NutritionalFacts[] = [
    { type: 'Calories', amount: 1.0079, percent: 12},
    { type: 'Total Fat', amount: 4.0026, percent: 45},
    { type: 'Cholesterol', amount: 6.941, percent: 20},
    { type: 'Sodium', amount: 9.0122, percent: 18},
  ];
  displayedColumns: string[] = ['type', 'amount', 'percent'];
  dataSource = this.ELEMENT_DATA;
  
  /**
   * @title Basic use of `<table mat-table>`
   */
  
  constructor() {}

  ngOnInit() {
  }

}
