import { TestBed } from '@angular/core/testing';

import { TotalleaveService } from './totalleave.service';

describe('TotalleaveService', () => {
  let service: TotalleaveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TotalleaveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
