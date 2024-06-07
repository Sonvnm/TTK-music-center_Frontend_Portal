import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragDropImageComponent } from './drag-drop-image.component';

describe('DragDropImageComponent', () => {
  let component: DragDropImageComponent;
  let fixture: ComponentFixture<DragDropImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragDropImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DragDropImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
