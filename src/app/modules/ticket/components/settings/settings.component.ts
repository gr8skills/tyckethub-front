import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {PasswordModalComponent} from '../../../user/components/password-modal/password-modal.component';
import {LayoutService} from '../../../shared/facades/layout.service';
import {AuthenticationService} from '../../../shared/facades/authentication.service';
import {UiService} from '../../../shared/core/ui.service';
import {EmailModalComponent} from '../../../user/components/email-modal/email-modal.component';
import {PhoneModalComponent} from '../../../user/components/phone-modal/phone-modal.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {

  tabs = ['communication', 'contact', 'privacy'];
  openTab = 'communication';

  layoutSub = new Subscription();
  isMobile = false;
  currentUser: any;

  constructor(private layoutService: LayoutService,
              private authService: AuthenticationService,
              private uiService: UiService) {
  }

  ngOnInit(): void {
    this.layoutSub = this.layoutService.handsetLayout$.subscribe(x => this.isMobile = x.matches);
    this.currentUser = this.authService.currentUserValue;
  }

  switchTab(tabName: string): void {
    this.openTab = tabName;
  }

  openChangeEmailModal(): void {
    const data = {
      email: this.currentUser.email
    };
    const dialogRef = this.uiService.openDialog(EmailModalComponent, this.isMobile, data);
    dialogRef.afterClosed().subscribe(modalData => console.log('Modal Data => ', modalData));
  }

  openChangePasswordModal(): void {
    const data = {
      oldPassword: 'password',
      newPassword: 'password',
      confirmNewPassword: 'password'
    };
    const dialogRef = this.uiService.openDialog(PasswordModalComponent, this.isMobile, data);
    dialogRef.afterClosed().subscribe(x => console.log(x));
  }

  openChangePhoneModal(): void {
    const data = {
      phone: this.currentUser.phone
    };
    const dialogRef = this.uiService.openDialog(PhoneModalComponent, this.isMobile, data);
  }

  ngOnDestroy(): void {
    this.layoutSub.unsubscribe();
  }
}
