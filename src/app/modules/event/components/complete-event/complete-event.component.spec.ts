import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteEventComponent } from './complete-event.component';

describe('CompleteEventComponent', () => {
  let component: CompleteEventComponent;
  let fixture: ComponentFixture<CompleteEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompleteEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
