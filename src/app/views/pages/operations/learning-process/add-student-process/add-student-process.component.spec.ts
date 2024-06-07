import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStudentProcessComponent } from './add-student-process.component';

describe('AddStudentProcessComponent', () => {
  let component: AddStudentProcessComponent;
  let fixture: ComponentFixture<AddStudentProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStudentProcessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddStudentProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
