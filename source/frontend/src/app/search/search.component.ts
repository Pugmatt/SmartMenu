import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  restaurant: String;
  location: String;
  resultsCount: String;

  constructor(route: ActivatedRoute) {
    this.restaurant = route.snapshot.params.restaurant;
    this.location = route.snapshot.params.location;

    this.resultsCount = "1 results for ";
    if(!this.restaurant || this.restaurant == "all")
      this.resultsCount += "\"" + this.location + "\"";
    else if(!this.location)
      this.resultsCount += "\"" + this.restaurant + "\"";
    else
      this.resultsCount += "\"" + this.restaurant + "\" in \"" + this.location + "\"";
  }

  ngOnInit() {
  }

}
