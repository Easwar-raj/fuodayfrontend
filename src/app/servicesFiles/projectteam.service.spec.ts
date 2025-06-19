import { TestBed } from '@angular/core/testing';

import { ProjectteamService } from './projectteam.service';

describe('ProjectteamService', () => {
  let service: ProjectteamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectteamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
