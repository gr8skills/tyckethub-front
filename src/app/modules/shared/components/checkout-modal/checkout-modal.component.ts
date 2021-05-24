import {Component, Inject, NgModule, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UiService} from '../../core/ui.service';
import {AttendeeService} from '../../../user/apis/attendee.service';
import {BaseService} from '../../facades/base.service';
import { Angular4PaystackModule } from 'angular4-paystack';
import {Flutterwave, InlinePaymentOptions, PaymentSuccessResponse} from 'flutterwave-angular-v3';


@Component({
  selector: 'app-checkout-modal',
  templateUrl: './checkout-modal.component.html',
  styleUrls: ['./checkout-modal.component.scss']
})


export class CheckoutModalComponent implements OnInit {

  isLoading = false;
  cardModel = {
    cardHolderName: this.data.user?.name[0],
    cardNumber: '1234567890123456',
    month: '01',
    year: '2021'
  };

  reference = '';
  title = '';

  paymentInit(): void {
    console.log('Payment initialized');
  }

  paymentDone(ref: any): any {
    this.submitPaymentDetail();
    this.title = 'Payment successful';
    console.log(this.title, ref);
  }

  paymentCancel(): void {
    console.log('payment failed');
  }

  constructor(public dialogRef: MatDialogRef<CheckoutModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private uiService: UiService,
              private attendeeService: AttendeeService,
              private baseService: BaseService) {
  }

  ngOnInit(): void {
    this.uiService.isBusy$.subscribe(x => this.isLoading = x);
    this.reference = `ref-${Math.ceil(Math.random() * 10e13)}`;
    console.log('Modal data', this.data);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  calculateTicketSubTotals(): number {
    if (this.data.ticketData.length === 0) {
      return 0;
    }
    let subTotal = 0;
    this.data.ticketData.forEach((ticket: any) => {
      subTotal += ticket.quantity * ticket.price;
    });

    return subTotal;
  }
  serviceCharge(): number {
    const charge = 0;
    return charge;
  }
  processingFee(): number {
    if (this.data.ticketData.length === 0) {
      return 0;
    }
    let fee = 0;
    this.data.ticketData.forEach((ticket: any) => {
      fee += ticket.quantity * ticket.price * 0.01;
    });
    return fee;
  }
  calculateTicketTotal(): number {
    const total = this.calculateTicketSubTotals() + this.serviceCharge() + this.processingFee();
    return (total);
  }

  submitPaymentDetail(): void {
    if (this.canSubmitPayment()) {
      this.uiService.busy = true;
      this.attendeeService.purchaseEventTickets(this.extractPaymentDetails(), +this.data.user.id).subscribe(
        response => {
          this.uiService.busy = false;
          this.uiService.openSnotify('Ticket(s) successfully purchased.', 'Success', 'success');
          this.dialogRef.close();
        },
        error => {
          this.uiService.busy = false;
          const errorMessage = this.baseService.processResponseError(error) ?? 'Operation failed. Please try again.';
          this.uiService.openSnotify(errorMessage, 'Error', 'error');
        }
      );
    } else {
      this.uiService.openSnotify('Make sure you fill all the necessary detail before submit.', 'OOPS', 'error');
      return;
    }
  }

  private canSubmitPayment(): boolean {
    let canSubmit = true;
    for (const [prop, val] of Object.entries(this.cardModel)) {
      if (!val) {
        canSubmit = false;
      }
    }
    return canSubmit;
  }

  private extractPaymentDetails(): any {
    const cardDetails = this.cardModel;
    const ticketsDetails: any[] = this.data.ticketData;
    const userId: number = +this.data.user?.id;
    const eventId: number = this.data.eventData.id;
    const amount: number = this.calculateTicketTotal();

    return {
      cardDetails,
      ticketsDetails,
      userId,
      eventId,
      amount
    };
  }
}
