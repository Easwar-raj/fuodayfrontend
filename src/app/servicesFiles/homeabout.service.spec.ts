import { TestBed } from '@angular/core/testing';

import { HomeaboutService } from './homeabout.service';

describe('HomeaboutService', () => {
  let service: HomeaboutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeaboutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
