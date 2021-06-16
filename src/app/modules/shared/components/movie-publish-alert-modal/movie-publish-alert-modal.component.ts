import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';

type ErrorObject = {
  message: string;
  actionLink: string;
  actionLabel?: string
};

@Component({
  selector: 'app-movie-publish-alert-modal',
  templateUrl: './movie-publish-alert-modal.component.html',
  styleUrls: ['./movie-publish-alert-modal.component.scss']
})
export class MoviePublishAlertModalComponent implements OnInit {
  errors: ErrorObject[] = [];
  constructor(public dialogRef: MatDialogRef<MoviePublishAlertModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private router: Router) { }

  ngOnInit(): void {
    this.errors = this.deserializeErrorData();
    console.log('errorObjects ', this.errors);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  navigationToActionLink(actionLink: string): void {
    this.dialogRef.close();
    this.router.navigateByUrl(actionLink);
  }

  private deserializeErrorData(): any {
    const errors: ErrorObject[] = [];
    if (this.data instanceof Object) {
      for (const [prop, val] of Object.entries(this.data.errorData)) {

        const item: ErrorObject = {
          message: String(val),
          actionLink: this.getErrorActionLabelLink(prop)[0],
          actionLabel: this.getErrorActionLabelLink(prop)[1]
        };
        // @ts-ignore
        errors.push(item);
      }
    } else if (typeof this.data.errorData === 'string') {
      // errors = [this.data.errorData];
      const item: ErrorObject = {
        message: this.data.errorData,
        actionLink: this.getErrorActionLabelLink('default')[0],
        actionLabel: this.getErrorActionLabelLink('default')[1]
      };
      // @ts-ignore
      errors.push(item);
    }
    return errors;
  }

  private getErrorActionLabelLink(errorPropValue: string): string[] {
    switch (errorPropValue) {
      case 'image':
        return [`/movies/${this.data.eventId}/edit/details`, 'Upload image'];
      case 'platform':
        return [`/movies/${this.data.eventId}/edit/online-event`, 'Add link'];
      case 'ticket':
        return [`/movies/${this.data.eventId}/edit/tickets`, 'Add ticket'];
      case 'ticket_setting':
        return [`/movies/${this.data.eventId}/edit/tickets`, 'Add ticket setting'];
      default:
        return [`/movies/${this.data.eventId}/edit/publish`, 'Fix error'];
    }
  }

}
