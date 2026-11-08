import { TestBed } from '@angular/core/testing';

import { ApiCoctelNombreService } from './api-coctel-nombre.service';

describe('ApiCoctelNombreService', () => {
  let service: ApiCoctelNombreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiCoctelNombreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
