import { TestBed } from '@angular/core/testing';

import { ApiCategoriaService } from './api-categoria.service';

describe('ApiCategoriaService', () => {
  let service: ApiCategoriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiCategoriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
