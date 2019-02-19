import { TestBed } from '@angular/core/testing';

import { RestaurantListService } from './restaurant-list.service';

describe('RestaurantListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestaurantListService = TestBed.get(RestaurantListService);
    expect(service).toBeTruthy();
  });
});
