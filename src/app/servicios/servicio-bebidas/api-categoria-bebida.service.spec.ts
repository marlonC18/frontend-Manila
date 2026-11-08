import { TestBed } from '@angular/core/testing';

import { ApiCategoriaBebidaService } from './api-categoria-bebida.service';

describe('ApiCategoriaBebidaService', () => {
  let service: ApiCategoriaBebidaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiCategoriaBebidaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
