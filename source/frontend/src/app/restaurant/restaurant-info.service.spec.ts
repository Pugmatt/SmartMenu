import { TestBed } from '@angular/core/testing';

import { RestaurantInfoService } from './restaurant-info.service';

describe('RestaurantInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestaurantInfoService = TestBed.get(RestaurantInfoService);
    expect(service).toBeTruthy();
  });
});
