import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { MatTableModule } from '@angular/material/table';
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
import { NutritionalFactsComponent } from './dish/nutritional-facts/nutritional-facts.component';
import { ModifyDishComponent } from './dish/modify-dish/modify-dish.component';

@NgModule({
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
    ReviewComponent,
    NutritionalFactsComponent,
    ModifyDishComponent
  ],
  entryComponents: [LoginComponent, CreateDishComponent, UploaderComponent, ReviewComponent, ModifyDishComponent],
  imports: [
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
    MatTooltipModule,
    MatTableModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
