import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentResponseModalComponent } from './payment-response-modal.component';

describe('PaymentResponseModalComponent', () => {
  let component: PaymentResponseModalComponent;
  let fixture: ComponentFixture<PaymentResponseModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentResponseModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentResponseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
