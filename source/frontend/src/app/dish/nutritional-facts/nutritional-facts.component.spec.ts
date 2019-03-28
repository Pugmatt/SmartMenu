import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NutritionalFactsComponent } from './nutritional-facts.component';

describe('NutritionalFactsComponent', () => {
  let component: NutritionalFactsComponent;
  let fixture: ComponentFixture<NutritionalFactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NutritionalFactsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NutritionalFactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
