import { TestBed } from '@angular/core/testing';

import { RestaurantInfoService } from './restaurant-info.service';

describe('RestaurantInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestaurantInfoService = TestBed.get(RestaurantInfoService);
    expect(service).toBeTruthy();
  });

  it('should get restaurant info', () => {
    const service: RestaurantInfoService = TestBed.get(RestaurantInfoService);
    service.getRestaurant('aDxYZL8M')
      .subscribe(restaurant => expect(restaurant.name).toBe('McDonalds'));
  });

  it('should get restaurant dishes', () => {
    const service: RestaurantInfoService = TestBed.get(RestaurantInfoService);
    service.getDishes('aDxYZL8M')
      .subscribe(dishes => expect(dishes[0].dishes).not.toBe(null));
  });
});
