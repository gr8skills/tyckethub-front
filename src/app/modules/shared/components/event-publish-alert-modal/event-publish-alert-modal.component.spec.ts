import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventPublishAlertModalComponent } from './event-publish-alert-modal.component';

describe('EventPublishAlertModalComponent', () => {
  let component: EventPublishAlertModalComponent;
  let fixture: ComponentFixture<EventPublishAlertModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventPublishAlertModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventPublishAlertModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
