import { TestBed } from '@angular/core/testing';

import { RestaurantSearchService } from './restaurant-search.service';

describe('RestaurantSearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestaurantSearchService = TestBed.get(RestaurantSearchService);
    expect(service).toBeTruthy();
  });

  it('should be able to search for restaurant', () => {
    const service: RestaurantSearchService = TestBed.get(RestaurantSearchService);
    this.restaurantSearchService.getRestaurants('Mcdonalds', 1)
      .subscribe(result => {
        expect(this.result.restaurants[0].name).toBe('McDonalds');
      });
  });
});
