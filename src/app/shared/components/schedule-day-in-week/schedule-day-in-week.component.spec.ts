import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleDayInWeekComponent } from './schedule-day-in-week.component';

describe('ScheduleDayInWeekComponent', () => {
  let component: ScheduleDayInWeekComponent;
  let fixture: ComponentFixture<ScheduleDayInWeekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleDayInWeekComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleDayInWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
