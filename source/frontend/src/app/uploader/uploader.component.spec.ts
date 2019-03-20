import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';

import { UploaderComponent } from './uploader.component';

describe('UploaderComponent', () => {
  let component: UploaderComponent;
  let fixture: ComponentFixture<UploaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should react to a file being chosen', () => {
    const input  = fixture.debugElement.query(By.css('input[type=file]')).nativeElement;

    spyOn(component, 'fileChange');
    input.dispatchEvent(new Event('change'));
    expect(component.fileChange).toHaveBeenCalled();
  });


});
