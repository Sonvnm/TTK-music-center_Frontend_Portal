import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberRangeComponent } from './number-range.component';

describe('NumberRangeComponent', () => {
  let component: NumberRangeComponent;
  let fixture: ComponentFixture<NumberRangeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NumberRangeComponent]
    });
    fixture = TestBed.createComponent(NumberRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
