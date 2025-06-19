import { TestBed } from '@angular/core/testing';

import { HeirarchyService } from './heirarchy.service';

describe('HeirarchyService', () => {
  let service: HeirarchyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeirarchyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
