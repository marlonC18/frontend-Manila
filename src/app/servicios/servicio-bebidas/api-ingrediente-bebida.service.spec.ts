import { TestBed } from '@angular/core/testing';

import { ApiIngredienteBebidaService } from './api-ingrediente-bebida.service';

describe('ApiIngredienteBebidaService', () => {
  let service: ApiIngredienteBebidaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiIngredienteBebidaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
