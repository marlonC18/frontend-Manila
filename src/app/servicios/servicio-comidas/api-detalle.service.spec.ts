import { TestBed } from '@angular/core/testing';

import { ApiDetalleService } from './api-detalle.service';

describe('ApiDetalleService', () => {
  let service: ApiDetalleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiDetalleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
