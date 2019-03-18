import { TestBed } from '@angular/core/testing';

import { CreateDishService } from './create-dish.service';

describe('CreateDishService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CreateDishService = TestBed.get(CreateDishService);
    expect(service).toBeTruthy();
  });
});
