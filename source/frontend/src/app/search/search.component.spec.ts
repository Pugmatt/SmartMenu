import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import {Restaurant} from "../restaurant";

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set elements based on search results', () => {
    const restaurant: Restaurant = {id: "ID", name: "Fast Food", create: "", description: "Good Food"};
    component.restaurants = [restaurant];
    component.pages = 1;
    component.total = 1;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#main > app-search > div.ng-star-inserted > p > app-restaurant-element > div > p').textContent).toEqual('Fast Food');
  });
});
