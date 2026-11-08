import { TestBed } from '@angular/core/testing';

import { ServicioComidasService } from './servicio-comidas.service';

describe('ServicioComidasService', () => {
  let service: ServicioComidasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioComidasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
