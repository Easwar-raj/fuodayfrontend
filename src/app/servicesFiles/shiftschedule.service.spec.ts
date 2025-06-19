import { TestBed } from '@angular/core/testing';

import { ShiftscheduleService } from './shiftschedule.service';

describe('ShiftscheduleService', () => {
  let service: ShiftscheduleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShiftscheduleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
