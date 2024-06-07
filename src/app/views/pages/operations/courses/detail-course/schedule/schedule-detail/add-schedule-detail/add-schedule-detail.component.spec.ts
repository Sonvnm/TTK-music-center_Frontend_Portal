import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddScheduleDetailComponent } from './add-schedule-detail.component';

describe('AddScheduleDetailComponent', () => {
  let component: AddScheduleDetailComponent;
  let fixture: ComponentFixture<AddScheduleDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddScheduleDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddScheduleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
