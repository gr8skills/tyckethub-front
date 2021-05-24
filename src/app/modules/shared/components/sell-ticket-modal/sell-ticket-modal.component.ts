import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Subject} from 'rxjs';
import {UiService} from '../../core/ui.service';
import {TicketFacade} from '../../../ticket/facade/ticket-facade';
import {BaseService} from '../../facades/base.service';

@Component({
  selector: 'app-sell-ticket-modal',
  templateUrl: './sell-ticket-modal.component.html',
  styleUrls: ['./sell-ticket-modal.component.scss']
})
export class SellTicketModalComponent implements OnInit {

  private readonly ticketInitialValues = JSON.parse(JSON.stringify(this.data));
  errorsSubject = new Subject<string[]>();
  errors$ = this.errorsSubject.asObservable();
  isLoading = false;

  constructor(public dialogRef: MatDialogRef<SellTicketModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private uiService: UiService,
              private ticketFacade: TicketFacade,
              private baseService: BaseService) {
  }

  ngOnInit(): void {
    this.uiService.isBusy$.subscribe(isBusy => this.isLoading = isBusy);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  normalizeInputValue(inputElement: HTMLInputElement, inputLabel: string): void {
    const maxValues = {
      amount: this.ticketInitialValues.amountPerTicket,
      quantity: this.ticketInitialValues.quantity
    };

    if (inputLabel === 'amount') {
      if (+inputElement.value > maxValues.amount) {
        inputElement.value = maxValues.amount;
      }
    }

    if (inputLabel === 'quantity') {
      if (+inputElement.value > maxValues.quantity) {
        inputElement.value = maxValues.quantity;
      }
    }
  }

  sell(): void {
    if (this.checkValueLimits().length > 0) {
      const errors = [...this.checkValueLimits()];
      this.errorsSubject.next(errors);
      return;
    }
    this.errorsSubject.next([]);
    this.uiService.busy = true;
    const payload = {
      amountPerTicket: this.data.amountPerTicket,
      quantity: this.data.quantity
    };
    this.ticketFacade.attendeeResellTickets(payload, +this.data.userId, +this.data.ticketId).subscribe(
      response => {
        this.uiService.busy = false;
        this.dialogRef.close({
          response: response.data,
          success: true
        });
      },
      error => {
        this.uiService.busy = false;
        const errorMessage = this.baseService.processResponseError(error) ?? 'Operation failed';
        this.dialogRef.close({
          response: errorMessage,
          success: false
        });
      }
    );
  }

  private checkValueLimits(): string[] {
    const valuesExceeded = [];
    if (+this.data.quantity > +this.ticketInitialValues.quantity) {
      valuesExceeded.push('The quantity of tickets exceeds the amount you have available');
    }
    if (+this.data.amountPerTicket > +this.ticketInitialValues.amountPerTicket) {
      valuesExceeded.push('The amount per ticket exceed the purchase price');
    }
    return valuesExceeded;
  }
}
