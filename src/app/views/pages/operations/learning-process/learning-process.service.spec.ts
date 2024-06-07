import { TestBed } from '@angular/core/testing';

import { LearningProcessService } from './learning-process.service';

describe('LearningProcessService', () => {
  let service: LearningProcessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LearningProcessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
