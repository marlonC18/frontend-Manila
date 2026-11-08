import { TestBed } from '@angular/core/testing';

import { ServicioPedidoService } from './servicio-pedido.service';

describe('ServicioPedidoService', () => {
  let service: ServicioPedidoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioPedidoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
