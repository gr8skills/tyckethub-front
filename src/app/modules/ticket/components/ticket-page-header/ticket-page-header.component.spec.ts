import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketPageHeaderComponent } from './ticket-page-header.component';

describe('TicketPageHeaderComponent', () => {
  let component: TicketPageHeaderComponent;
  let fixture: ComponentFixture<TicketPageHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketPageHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketPageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
