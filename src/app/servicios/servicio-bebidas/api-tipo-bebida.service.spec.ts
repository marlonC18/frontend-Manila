import { TestBed } from '@angular/core/testing';

import { ApiTipoBebidaService } from './api-tipo-bebida.service';

describe('ApiTipoBebidaService', () => {
  let service: ApiTipoBebidaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiTipoBebidaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
