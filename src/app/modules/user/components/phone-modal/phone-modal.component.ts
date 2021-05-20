import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-phone-modal',
  templateUrl: './phone-modal.component.html',
  styleUrls: ['./phone-modal.component.scss']
})
export class PhoneModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PhoneModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
