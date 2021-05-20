import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UiService} from '../../core/ui.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-ticket-setting-modal',
  templateUrl: './ticket-setting-modal.component.html',
  styleUrls: ['./ticket-setting-modal.component.scss']
})
export class TicketSettingModalComponent implements OnInit {
  ticketStatus = {
    public: true,
    private: false
  };
  salesChannel = {
    online: true,
    outlet: false
  };
  tempDate = new Date();
  ticketSettingsForm = new FormGroup({
    salesStart: new FormControl('', [Validators.required]),
    salesEnd : new FormControl('', [Validators.required]),
    minimumPerOrder: new FormControl(1),
    maximumPerOrder: new FormControl(10),
  });

  constructor(public dialogRef: MatDialogRef<TicketSettingModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private uiService: UiService) { }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close(null);
  }

  selectTicketStatus(status: string): void {
    this.toggleTicketStatus(status);
  }

  selectSalesChannel(channel: string): void {
    this.toggleSalesChannel(channel);
  }

  save(): void {
    if (this.ticketSettingsForm.valid) {
      this.ticketSettingsForm.value.status = this.selectedStatus();
      this.ticketSettingsForm.value.channel = this.selectedChannel();

      this.dialogRef.close(this.ticketSettingsForm.value);
    }
  }

  private toggleTicketStatus(status: string): void {
    for (const [key, val] of Object.entries(this.ticketStatus)) {
      // @ts-ignore
      this.ticketStatus[key] = key === status;
    }
    console.log('Ticket Status: ', this.ticketStatus);
  }

  private toggleSalesChannel(channel: string): void {
    for (const [key, val] of Object.entries(this.salesChannel)) {
      // @ts-ignore
      this.salesChannel[key] = key === channel;
    }
    console.log('Sales channel ', this.salesChannel);
  }

  private selectedStatus(): string {
    let status = '';
    for (const [prop, val] of Object.entries(this.ticketStatus)) {
      // @ts-ignore
      if (this.ticketStatus[prop] === true) {
        status = prop;
      }
    }
    return status;
  }

  private selectedChannel(): string {
    let channel = '';
    for (const [prop, val] of Object.entries(this.salesChannel)) {
      // @ts-ignore
      if (this.salesChannel[prop] === true) {
        channel = prop;
      }
    }

    return channel;
  }
}
