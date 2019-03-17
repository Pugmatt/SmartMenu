import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MenuComponent} from './menu/menu.component';
import {HomeComponent} from './home/home.component';
import {RegisterComponent} from './register/register.component';
import {SearchComponent} from './search/search.component';
import { RestaurantElementComponent } from './restaurant-element/restaurant-element.component';
import { RestaurantPageComponent } from './restaurant-page/restaurant-page.component';
import { BarLouiePageComponent } from './bar-louie-page/bar-louie-page.component';
import { ReviewComponent } from './review/review.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'restaurant-element', component: RestaurantElementComponent },
  { path: 'restaurant-page', component: RestaurantPageComponent },
  { path: 'search/:restaurant/:location', component: SearchComponent, pathMatch: 'full'},
  { path: 'bar-louie-page', component: BarLouiePageComponent},
  {path: 'review', component:ReviewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
