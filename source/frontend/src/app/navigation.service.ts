import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {NavItem} from './nav-item';
import {NAVLIST} from './nav-list';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor() {
  }

  // Retrieve list of items on navigation list from constant list
  public get(): Observable<NavItem[]> {
    return of(NAVLIST);
  }
}
