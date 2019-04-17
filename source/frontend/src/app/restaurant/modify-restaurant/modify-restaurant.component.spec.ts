import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyRestaurantComponent } from './modify-restaurant.component';

describe('ModifyRestaurantComponent', () => {
  let component: ModifyRestaurantComponent;
  let fixture: ComponentFixture<ModifyRestaurantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyRestaurantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
