import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NavigationComponent } from './navigation/navigation.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './product-list/product-list.component';
import { RestaurantElementComponent } from './restaurant-element/restaurant-element.component';
import { RegisterComponent } from './register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SearchBoxComponent } from './home/search-box/search-box.component';
import { SearchComponent } from './search/search.component';
import { LoginComponent } from './login/login.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';

import { UserService } from "./user.service";
import { DishComponent } from './dish/dish.component';

import { FileSelectDirective } from 'ng2-file-upload';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { CreateDishComponent } from './dish/create-dish/create-dish.component';
import { UploaderComponent } from './uploader/uploader.component';
import { ReviewComponent } from "./review/review.component";
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatButtonToggleModule,
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule,
        MatGridListModule,
        MatIconModule,
        MatRippleModule,
        MatCardModule,
        MatTooltipModule
      ],
      declarations: [
        AppComponent,
        HeaderComponent,
        NavigationComponent,
        MenuComponent,
        HomeComponent,
        ProductListComponent,
        RestaurantElementComponent,
        RegisterComponent,
        RestaurantsComponent,
        SearchComponent,
        SearchBoxComponent,
        LoginComponent,
        SearchComponent,
        DishComponent,
        FileSelectDirective,
        RestaurantComponent,
        CreateDishComponent,
        UploaderComponent,
        ReviewComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'SmartMenu'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('SmartMenu');
  });

  it('should render logo', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#logo').src).toContain('/assets/logo.png');
  });
});
