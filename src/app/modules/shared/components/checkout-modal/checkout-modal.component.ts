import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UiService} from '../../core/ui.service';
import {AttendeeService} from '../../../user/apis/attendee.service';
import {BaseService} from '../../facades/base.service';

@Component({
  selector: 'app-checkout-modal',
  templateUrl: './checkout-modal.component.html',
  styleUrls: ['./checkout-modal.component.scss']
})
export class CheckoutModalComponent implements OnInit {

  isLoading = false;
  cardModel = {
    cardHolderName: '',
    cardNumber: '',
    month: '01',
    year: '2021'
  };

  constructor(public dialogRef: MatDialogRef<CheckoutModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private uiService: UiService,
              private attendeeService: AttendeeService,
              private baseService: BaseService) {
  }

  ngOnInit(): void {
    this.uiService.isBusy$.subscribe(x => this.isLoading = x);
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
    const amount: number = this.calculateTicketSubTotals();

    return {
      cardDetails,
      ticketsDetails,
      userId,
      eventId,
      amount
    };
  }
}
