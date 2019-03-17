import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

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
import { SearchBoxComponent } from './home/search-box/search-box.component';
import { SearchComponent } from './search/search.component';
import { LoginComponent } from './login/login.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { BarLouiePageComponent } from './bar-louie-page/bar-louie-page.component';

import { UserService } from "./user.service";
import { DishComponent } from './dish/dish.component';

import { FileSelectDirective } from 'ng2-file-upload';
import { RestaurantComponent } from './restaurant/restaurant.component';

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
    BarLouiePageComponent,
    FileSelectDirective,
    RestaurantComponent
  ],
  entryComponents: [LoginComponent],
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
    MatGridListModule,
    MatIconModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }