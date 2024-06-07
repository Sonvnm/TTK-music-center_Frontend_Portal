import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubjectCourseComponent } from './add-subject-course.component';

describe('AddSubjectCourseComponent', () => {
  let component: AddSubjectCourseComponent;
  let fixture: ComponentFixture<AddSubjectCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSubjectCourseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSubjectCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
