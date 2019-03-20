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

  it('should display restaurant details', () => {
    component.restaurant = {name: 'Test', id: 'ID'};
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#restaurant_name').textContent).toEqual('Fast Food');
  });
});
