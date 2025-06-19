import { TestBed } from '@angular/core/testing';

import { FeedassignService } from './feedassign.service';

describe('FeedassignService', () => {
  let service: FeedassignService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeedassignService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
