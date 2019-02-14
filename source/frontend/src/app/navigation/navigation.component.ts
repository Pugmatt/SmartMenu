import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../navigation.service';
import {NavItem} from '../nav-item';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  navItems: NavItem[];

  constructor(private navigationService: NavigationService) { }

  ngOnInit() {
    this.getNavItems();
  }

  private getNavItems(): void {
    this.navigationService.get()
      .subscribe(items => this.navItems = items);
  }

}
