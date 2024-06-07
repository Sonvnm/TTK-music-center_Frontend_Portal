import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProcessStudentComponent } from './update-process-student.component';

describe('UpdateProcessStudentComponent', () => {
  let component: UpdateProcessStudentComponent;
  let fixture: ComponentFixture<UpdateProcessStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateProcessStudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateProcessStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
