import { TestBed } from '@angular/core/testing';

import { StocksServiceService } from './stocks-service.service';

describe('StocksServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StocksServiceService = TestBed.get(StocksServiceService);
    expect(service).toBeTruthy();
  });
});
