import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningProcessComponent } from './learning-process.component';

describe('LearningProcessComponent', () => {
  let component: LearningProcessComponent;
  let fixture: ComponentFixture<LearningProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearningProcessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearningProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
