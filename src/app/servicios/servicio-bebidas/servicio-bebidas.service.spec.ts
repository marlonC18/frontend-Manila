import { TestBed } from '@angular/core/testing';

import { ServicioBebidasService } from './servicio-bebidas.service';

describe('ServicioBebidasService', () => {
  let service: ServicioBebidasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioBebidasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
