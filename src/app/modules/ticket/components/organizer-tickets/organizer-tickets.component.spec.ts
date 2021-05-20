import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizerTicketsComponent } from './organizer-tickets.component';

describe('OrganizerTicketsComponent', () => {
  let component: OrganizerTicketsComponent;
  let fixture: ComponentFixture<OrganizerTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizerTicketsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizerTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
