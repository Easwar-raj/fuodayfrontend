import { TestBed } from '@angular/core/testing';

import { PerformegoalService } from './performegoal.service';

describe('PerformegoalService', () => {
  let service: PerformegoalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerformegoalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
