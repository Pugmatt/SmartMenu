import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarLouiePageComponent } from './bar-louie-page.component';

describe('BarLouiePageComponent', () => {
  let component: BarLouiePageComponent;
  let fixture: ComponentFixture<BarLouiePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarLouiePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarLouiePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
