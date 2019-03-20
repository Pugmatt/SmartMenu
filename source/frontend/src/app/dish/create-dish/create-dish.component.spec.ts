import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDishComponent } from './create-dish.component';
import {FormsModule} from "@angular/forms";

describe('CreateDishComponent', () => {
  let component: CreateDishComponent;
  let fixture: ComponentFixture<CreateDishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDishComponent ],
      imports: [ FormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
