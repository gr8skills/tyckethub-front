import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventStatusFormComponent } from './event-status-form.component';

describe('EventStatusFormComponent', () => {
  let component: EventStatusFormComponent;
  let fixture: ComponentFixture<EventStatusFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventStatusFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventStatusFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
