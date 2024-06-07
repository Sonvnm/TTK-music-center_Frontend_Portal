import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLearningProcessComponent } from './add-learning-process.component';

describe('AddLearningProcessComponent', () => {
  let component: AddLearningProcessComponent;
  let fixture: ComponentFixture<AddLearningProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLearningProcessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLearningProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
