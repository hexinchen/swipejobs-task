import { TestBed } from '@angular/core/testing';

import { JobMatchesService } from './job-matches.service';

describe('JobMatchesService', () => {
  let service: JobMatchesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobMatchesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
