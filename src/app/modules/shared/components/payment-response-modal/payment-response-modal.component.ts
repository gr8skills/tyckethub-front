import {Component, Inject, NgModule, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UiService} from '../../core/ui.service';
import {BaseService} from '../../facades/base.service';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../facades/authentication.service';
import {AttendeeService} from '../../../user/apis/attendee.service';


@Component({
  selector: 'app-payment-response-modal',
  templateUrl: './payment-response-modal.component.html',
  styleUrls: ['./payment-response-modal.component.scss']
})
export class PaymentResponseModalComponent implements OnInit {

  role: any;

  constructor(private authService: AuthenticationService,
              public dialogRef: MatDialogRef<PaymentResponseModalComponent>,
              private router: Router,
              @Inject(MAT_DIALOG_DATA) public data: any,
              attendeeService: AttendeeService) { }

  ngOnInit(): void {
    console.log(this.data);
  }

  closeDialog(): void {
    this.dialogRef.close();
    this.role = this.authService.currentUserValue.role;
    if (this.role === 'attendee'){
      this.router.navigateByUrl(`tickets/my-tickets`);
    }else {
      this.router.navigateByUrl(`tickets/organizer/overview`);
    }
  }


}
