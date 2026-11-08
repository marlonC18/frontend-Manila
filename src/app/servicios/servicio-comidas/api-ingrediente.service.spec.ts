import { TestBed } from '@angular/core/testing';

import { ApiIngredienteService } from './api-ingrediente.service';

describe('ApiIngredienteService', () => {
  let service: ApiIngredienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiIngredienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
