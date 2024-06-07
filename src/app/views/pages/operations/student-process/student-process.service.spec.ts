import { TestBed } from '@angular/core/testing';

import { StudentProcessService } from './student-process.service';

describe('StudentProcessService', () => {
  let service: StudentProcessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentProcessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
