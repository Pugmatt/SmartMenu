import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantElementComponent } from './restaurant-element.component';

describe('RestaurantElementComponent', () => {
  let component: RestaurantElementComponent;
  let fixture: ComponentFixture<RestaurantElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
