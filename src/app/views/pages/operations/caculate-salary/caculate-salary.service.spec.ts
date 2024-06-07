import { TestBed } from '@angular/core/testing';

import { CaculateSalaryService } from './caculate-salary.service';

describe('CaculateSalaryService', () => {
  let service: CaculateSalaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaculateSalaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
