import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HmzButtonsComponent } from './hmz-buttons.component';

describe('HmzButtonsComponent', () => {
  let component: HmzButtonsComponent;
  let fixture: ComponentFixture<HmzButtonsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HmzButtonsComponent]
    });
    fixture = TestBed.createComponent(HmzButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
