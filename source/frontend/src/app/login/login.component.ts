import { Component, OnInit } from '@angular/core';

import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import {UserService} from "../user.service";
import {User} from "../user";
import {Restaurant} from "../restaurant";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    private userService: UserService,
    private router: Router) {}

  error: String = "";

  onSubmit(form: NgForm) {
    const values = form.form.value;
    const user: User = new User();
    user.email = values.email;
    user.password = values.pass;

    if(user.email && user.password) {
      this.userService.login(user).subscribe(msg => {
        if(msg.error)
          this.error = msg.error;
        else {
          this.userService.user = msg.user;
          this.dialogRef.close();
        }
      }, error => {
        this.error = error.error;
      });
    }
  }

  ngOnInit() {
  }

}
