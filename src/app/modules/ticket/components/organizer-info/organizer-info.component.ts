import {Component, OnInit} from '@angular/core';
import {UiService} from '../../../shared/core/ui.service';
import {AuthenticationService} from '../../../shared/facades/authentication.service';
import {PhoneModalComponent} from '../../../user/components/phone-modal/phone-modal.component';
import {Subscription} from 'rxjs';
import {LayoutService} from '../../../shared/facades/layout.service';
import {PasswordModalComponent} from '../../../user/components/password-modal/password-modal.component';
import {EmailModalComponent} from '../../../user/components/email-modal/email-modal.component';

@Component({
  selector: 'app-organizer-info',
  templateUrl: './organizer-info.component.html',
  styleUrls: ['./organizer-info.component.scss']
})
export class OrganizerInfoComponent implements OnInit {
  layoutSub = new Subscription();
  currentUser: any;
  isMobile = false;

  constructor(private uiService: UiService,
              private authService: AuthenticationService,
              private layoutService: LayoutService) {
  }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.layoutSub = this.layoutService.handsetLayout$.subscribe(x => this.isMobile = x.matches);
  }

  openChangeEmailModal(): void {
    const data = {
      email: this.currentUser.email
    };
    const dialogRef = this.uiService.openDialog(EmailModalComponent, this.isMobile, data);
  }

  openChangePhoneModal(): void {
    const data = {
      phone: this.currentUser.phone
    };
    const dialogRef = this.uiService.openDialog(PhoneModalComponent, this.isMobile, data);
  }
}
