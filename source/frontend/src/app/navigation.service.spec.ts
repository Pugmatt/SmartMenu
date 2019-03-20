import { TestBed } from '@angular/core/testing';

import { NavigationService } from './navigation.service';

describe('NavigationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NavigationService = TestBed.get(NavigationService);
    expect(service).toBeTruthy();
  });

  it('should return navigation list', () => {
    const service: NavigationService = TestBed.get(NavigationService);
    this.navigationService.get()
      .subscribe(items => expect(items).not.toBe(null) );
  });
});
