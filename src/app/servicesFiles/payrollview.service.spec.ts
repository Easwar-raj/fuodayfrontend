import { TestBed } from '@angular/core/testing';

import { PayrollviewService } from './payrollview.service';

describe('PayrollviewService', () => {
  let service: PayrollviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PayrollviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
