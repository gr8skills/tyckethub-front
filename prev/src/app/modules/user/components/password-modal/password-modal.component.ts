import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-password-modal',
  templateUrl: './password-modal.component.html',
  styleUrls: ['./password-modal.component.scss']
})
export class PasswordModalComponent implements OnInit {

  passwordFields = {
    old: false,
    new: false,
    confirm: false
  };
  constructor(public dialogRef: MatDialogRef<PasswordModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  togglePasswordVisibility(targetField: HTMLInputElement): void {
    const arrCont = [];
    for (const [key, val] of Object.entries(this.passwordFields)) {
      arrCont.push(key);
    }
    if (arrCont.indexOf(targetField.name) === -1) {
      return;
    }
    // @ts-ignore
    this.passwordFields[targetField.name] = !this.passwordFields[targetField.name];
    // @ts-ignore
    targetField.type = this.passwordFields[targetField.name] ? 'text' : 'password';
  }

}
