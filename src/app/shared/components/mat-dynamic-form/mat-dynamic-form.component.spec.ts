import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatDynamicFormComponent } from './mat-dynamic-form.component';

describe('MatDynamicFormComponent', () => {
  let component: MatDynamicFormComponent;
  let fixture: ComponentFixture<MatDynamicFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatDynamicFormComponent]
    });
    fixture = TestBed.createComponent(MatDynamicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
