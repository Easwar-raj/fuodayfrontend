import { TestBed } from '@angular/core/testing';

import { ClientImgService } from './client-img.service';

describe('ClientImgService', () => {
  let service: ClientImgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientImgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
