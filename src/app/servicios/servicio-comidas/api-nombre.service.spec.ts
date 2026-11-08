import { TestBed } from '@angular/core/testing';

import { ApiNombreService } from './api-nombre.service';

describe('ApiNombreService', () => {
  let service: ApiNombreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiNombreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
