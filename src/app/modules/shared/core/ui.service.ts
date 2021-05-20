import {Injectable} from '@angular/core';
import {SnotifyPosition, SnotifyService, SnotifyStyle, SnotifyToast, SnotifyToastConfig} from 'ng-snotify';
import {BehaviorSubject} from 'rxjs';
import {MatSnackBar, MatSnackBarConfig, MatSnackBarRef} from '@angular/material/snack-bar';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  isBusySubject = new BehaviorSubject<boolean>(false);
  isBusy$ = this.isBusySubject.asObservable();
  private snotifyConfig: SnotifyToastConfig = {
    timeout: 5000,
    showProgressBar: true,
    closeOnClick: false,
    pauseOnHover: true,
    position: SnotifyPosition.rightTop,
  };
  private snackBarConfig: MatSnackBarConfig = {
    duration: 5000,
    horizontalPosition: 'start',
    verticalPosition: 'bottom'
  };

  constructor(private snotifyService: SnotifyService,
              private snackBar: MatSnackBar,
              private uiLoaderService: NgxUiLoaderService,
              private dialog: MatDialog) {
  }

  set busy(value: boolean) {
    this.isBusySubject.next(value);
  }

  openSnackBar(message: string, actionLabel?: string): MatSnackBarRef<any> {
    return this.snackBar.open(message, actionLabel, this.snackBarConfig);
  }

  openSnotify(message: string, title?: string, actionType?: string): SnotifyToast {
    if (actionType) {
      switch (actionType) {
        case SnotifyStyle.info:
          return this.snotifyService.info(message, title ?? '', this.snotifyConfig);
        case SnotifyStyle.confirm:
          return this.snotifyService.confirm(message, title ?? '', this.snotifyConfig);
        case SnotifyStyle.prompt:
          return this.snotifyService.prompt(message, title ?? '', this.snotifyConfig);
        case SnotifyStyle.warning:
          return this.snotifyService.warning(message, title ?? '', this.snotifyConfig);
        case SnotifyStyle.error:
          return this.snotifyService.error(message, title ?? '', this.snotifyConfig);
        case SnotifyStyle.success:
          return this.snotifyService.success(message, title ?? '', this.snotifyConfig);
        default:
          return this.snotifyService.simple(message, title ?? '', this.snotifyConfig);
      }

    }
    return this.snotifyService.simple(message, title ?? '', this.snotifyConfig);
  }

  openDialog(component: any, isMobile = false, data?: any): MatDialogRef<any> {
    const config: MatDialogConfig = {
      data,
      width: isMobile ? '100%' : '35vw',
      closeOnNavigation: true,
    };
    return this.dialog.open(component, config);
  }

  openCheckOutDialog(component: any, isMobile = false, data?: any): MatDialogRef<any> {
    const config: MatDialogConfig = {
      data,
      width: isMobile ? '100%' : '90vw',
      closeOnNavigation: true
    };
    return this.dialog.open(component, config);
  }

  blockPage(): void {
    this.uiLoaderService.start();
  }

  unBlockPage(): void {
    this.uiLoaderService.stop();
  }
}
