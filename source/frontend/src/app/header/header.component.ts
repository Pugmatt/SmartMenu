import { Component, OnInit } from '@angular/core';
import {NavItem} from '../nav-item';
import {NavigationService} from '../navigation.service';

import { LoginComponent } from '../login/login.component';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  login(): void {
    let dialogRef = this.dialog.open(LoginComponent, {

    });
  }

  ngOnInit() {
  }
}
