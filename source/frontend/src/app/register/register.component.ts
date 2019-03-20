import { Component, OnInit } from '@angular/core';

import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import {UserService} from "../user.service";
import {User} from "../user";
import {Restaurant} from "../restaurant";

@Component({
  selector: 'app-register', 
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})

export class RegisterComponent  
{  
  private selectedLink: string = "Consumer";     

  constructor(private userService: UserService,
    private router: Router) {}
  
  setradio(e: string): void   
  {  
    this.selectedLink = e;    
    this.error = "";
  }  
  
  isSelected(name: string): boolean   
  {  
    if (!this.selectedLink) { // if no radio button is selected, always return false so every nothing is shown  
      return false;  
    }  
  
    return (this.selectedLink === name); // if current radio button is selected, return true, else return false  
  }  

  error: String;

  onSubmit(form: NgForm, consumer: boolean) {
    const values = form.form.value;
    const user: User = { 
      consumer: consumer,
      email: values.email,
      username: values.username,
      firstname: values.firstName,
      lastname: values.lastName,
      password: values.pass, 
      restaurant: null
    };
    if(!consumer) {
      const restaurant: Restaurant = new Restaurant();
      restaurant.name = values.companyName;
      restaurant.description = values.companyDesc;
      user.restaurant = restaurant;
    }
    // Check if information is valid before sending to backend
    var valid = this.infoValid(user);
    if(valid == "y") {
      this.userService.register(user).subscribe(msg => {
        if(msg.error)
          this.error = msg.error;
        else {
          this.userService.user = msg.user;
          this.router.navigate(['/home']);
        }
      });
    }
    else {
      this.error = valid; 
    }
    
  }

  // Check if sent information valid
infoValid(user) {
  if(user.consumer) {
    // Check variables are correct types
    if(!(typeof user.username == 'string' && typeof user.password == 'string' && typeof user.email == 'string' &&
      typeof user.firstname == 'string' && typeof user.lastname == 'string'))
      return "Invalid variable types";

    // Check if variables have correct lengths and properties
    if(user.username.length < 3 || user.username.length > 20)
      return "Username must greater than 3 and less than 20 characters";
    else if(user.password.length < 6 || user.password.length > 20)
      return "Password must greater than 6 and less than 20 characters";
    else if(!this.validateEmail(user.email))
      return "Invalid email address";
    else if(user.firstname.length < 1 || user.firstname.length > 50 ||
      user.lastname.length < 1 && user.lastname.length > 50)
      return "Names must greater than 1 and less than 20 characters"
  }
  else {
    // Check variables are correct types
    if(!(typeof user.password == 'string' && typeof user.email == 'string' &&
      typeof user.firstname == 'string' && typeof user.lastname == 'string' &&
      user.restaurant && typeof user.restaurant.name == 'string' && typeof user.restaurant.description == 'string'))
      return "Invalid variable types";

    // Check if variables have correct lengths and properties
    if(user.restaurant.name.length < 3 || user.restaurant.name.length > 50)
      return "Company Name must greater than 3 and less than 50 characters";
    else if(user.restaurant.description.length < 0 || user.restaurant.description.length > 2000)
      return "Company description must greater than 0 and less than 2000 characters";
    else if(user.password.length < 6 || user.password.length > 20)
      return "Password must greater than 6 and less than 20 characters";
    else if(!this.validateEmail(user.email))
      return "Invalid email address";
    else if(user.firstname.length < 1 || user.firstname.length > 50 ||
      user.lastname.length < 1 && user.lastname.length > 50)
      return "Names must greater than 1 and less than 20 characters"
  }

  return "y";
}

validateEmail(email) {
  let re: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email.toLowerCase());
}
  
}   


