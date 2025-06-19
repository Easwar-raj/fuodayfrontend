import { TestBed } from '@angular/core/testing';

import { TeamMainDataService } from './team-main-data.service';

describe('TeamMainDataService', () => {
  let service: TeamMainDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamMainDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
