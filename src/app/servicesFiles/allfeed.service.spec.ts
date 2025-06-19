import { TestBed } from '@angular/core/testing';

import { AllfeedService } from './allfeed.service';

describe('AllfeedService', () => {
  let service: AllfeedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllfeedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
