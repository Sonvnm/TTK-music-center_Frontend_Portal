import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HmzTableComponent } from './hmz-table.component';

describe('HmzTableComponent', () => {
  let component: HmzTableComponent;
  let fixture: ComponentFixture<HmzTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HmzTableComponent]
    });
    fixture = TestBed.createComponent(HmzTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
