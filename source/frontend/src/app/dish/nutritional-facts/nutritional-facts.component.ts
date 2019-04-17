import {Component, Input, OnInit, OnChanges, DoCheck, SimpleChanges} from '@angular/core';
import { Dish } from '../dish';

export interface NutritionalFacts {
  type: string;
  amount: string;
}

@Component({
  selector: 'app-nutritional-facts',
  templateUrl: './nutritional-facts.component.html',
  styleUrls: ['./nutritional-facts.component.css']
})
export class NutritionalFactsComponent implements OnInit, DoCheck {
  @Input() dish;
  oldDish;
  ELEMENT_DATA: NutritionalFacts[];
  displayedColumns: string[] = ['type', 'amount'];
  dataSource;
  
  constructor() {
  }

  ngOnInit() {
    this.ELEMENT_DATA = [
      { type: 'Calories', amount: (this.dish.nutritional.calories < 0 ? 'N/A' : this.dish.nutritional.calories)},
      { type: 'Total Fat', amount: (this.dish.nutritional.total_fat < 0 ? 'N/A' : this.dish.nutritional.total_fat)},
      { type: 'Cholesterol', amount: (this.dish.nutritional.cholesterol < 0 ? 'N/A' : this.dish.nutritional.cholesterol)},
      { type: 'Sodium', amount: (this.dish.nutritional.sodium < 0 ? 'N/A' : this.dish.nutritional.sodium)},
    ];
    this.dataSource = this.ELEMENT_DATA;
  }

  ngDoCheck() {
        this.ELEMENT_DATA = [
          { type: 'Calories', amount: (this.dish.nutritional.calories < 0 ? 'N/A' : this.dish.nutritional.calories)},
          { type: 'Total Fat', amount: (this.dish.nutritional.total_fat < 0 ? 'N/A' : this.dish.nutritional.total_fat)},
          { type: 'Cholesterol', amount: (this.dish.nutritional.cholesterol < 0 ? 'N/A' : this.dish.nutritional.cholesterol)},
          { type: 'Sodium', amount: (this.dish.nutritional.sodium < 0 ? 'N/A' : this.dish.nutritional.sodium)},
        ];
        this.dataSource = this.ELEMENT_DATA;
  }



}
