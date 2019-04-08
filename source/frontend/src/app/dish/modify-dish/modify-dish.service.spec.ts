import { TestBed } from '@angular/core/testing';

import { ModifyDishService } from './modify-dish.service';

describe('ModifyDishService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModifyDishService = TestBed.get(ModifyDishService);
    expect(service).toBeTruthy();
  });
});
