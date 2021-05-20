import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventTicketFormComponent } from './event-ticket-form.component';

describe('EventTicketFormComponent', () => {
  let component: EventTicketFormComponent;
  let fixture: ComponentFixture<EventTicketFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventTicketFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventTicketFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
