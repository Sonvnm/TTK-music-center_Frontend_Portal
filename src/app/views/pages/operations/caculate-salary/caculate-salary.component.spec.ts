import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaculateSalaryComponent } from './caculate-salary.component';

describe('CaculateSalaryComponent', () => {
  let component: CaculateSalaryComponent;
  let fixture: ComponentFixture<CaculateSalaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaculateSalaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaculateSalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
