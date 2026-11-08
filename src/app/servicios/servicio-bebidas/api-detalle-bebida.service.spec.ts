import { TestBed } from '@angular/core/testing';

import { ApiDetalleBebidaService } from './api-detalle-bebida.service';

describe('ApiDetalleBebidaService', () => {
  let service: ApiDetalleBebidaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiDetalleBebidaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
