 import { Component, OnInit } from '@angular/core';
import {NavItem} from '../nav-item';
import {NavigationService} from '../navigation.service';

import { LoginComponent } from '../login/login.component';

import {UserService} from "../user.service";

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public dialog: MatDialog,
    private userService: UserService) { 
      this.getUser();
    }

  login(): void {
    let dialogRef = this.dialog.open(LoginComponent, {

    });
  }

  logout(): void {
    this.userService.logout().subscribe(msg => {
      if(msg.user) {
        this.userService.user = null;
      }
    });
  }

  getUser() {
    this.userService.get().subscribe(msg => {
      if(msg.user) {
        this.userService.user = msg.user;
      }
    });
  }

  user() {
    return this.userService.user;
  }

  ngOnInit() {
  }
}
