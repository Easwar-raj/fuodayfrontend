import { TestBed } from '@angular/core/testing';

import { JobopeningsService } from './jobopenings.service';

describe('JobopeningsService', () => {
  let service: JobopeningsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobopeningsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
