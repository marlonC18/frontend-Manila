import { TestBed } from '@angular/core/testing';

import { ServicioFacturaPdfService } from './servicio-factura-pdf.service';

describe('ServicioFacturaPdfService', () => {
  let service: ServicioFacturaPdfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioFacturaPdfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
