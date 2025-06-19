import { TestBed } from '@angular/core/testing';

import { WebuserempService } from './webuseremp.service';

describe('WebuserempService', () => {
  let service: WebuserempService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebuserempService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
