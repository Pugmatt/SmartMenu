import { Component, OnInit } from '@angular/core';
import {NavItem} from '../nav-item';
import {NavigationService} from '../navigation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  login(): void {
    
  }

  constructor() { }

  ngOnInit() {
  }
}
