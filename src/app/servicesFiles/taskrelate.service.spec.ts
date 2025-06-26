import { TestBed } from '@angular/core/testing';

import { TaskrelateService } from './taskrelate.service';

describe('TaskrelateService', () => {
  let service: TaskrelateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskrelateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
