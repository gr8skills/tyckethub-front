import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellTicketModalComponent } from './sell-ticket-modal.component';

describe('SellTicketModalComponent', () => {
  let component: SellTicketModalComponent;
  let fixture: ComponentFixture<SellTicketModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellTicketModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellTicketModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
