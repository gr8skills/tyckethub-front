import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEventTicketsComponent } from './edit-event-tickets.component';

describe('EditEventTicketsComponent', () => {
  let component: EditEventTicketsComponent;
  let fixture: ComponentFixture<EditEventTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditEventTicketsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEventTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
