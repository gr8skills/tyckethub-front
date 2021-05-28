import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {PasswordModalComponent} from '../../../user/components/password-modal/password-modal.component';
import {LayoutService} from '../../../shared/facades/layout.service';
import {AuthenticationService} from '../../../shared/facades/authentication.service';
import {UiService} from '../../../shared/core/ui.service';
import {EmailModalComponent} from '../../../user/components/email-modal/email-modal.component';
import {PhoneModalComponent} from '../../../user/components/phone-modal/phone-modal.component';
import {EventStatusService} from '../../../event/apis/event-status.service';
import {Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {BaseService} from "../../../shared/facades/base.service";
import {EventTicketType} from "../../../shared/models/enums";

interface EventData {
  id: number;
  name: string;
  action: { label: string, link: string }[];
}

@Component({
  selector: 'app-site-settings',
  templateUrl: './site-settings.component.html',
  styleUrls: ['./site-settings.component.scss']
})
export class SiteSettingsComponent implements OnInit, OnDestroy{
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  tabs = ['status', 'artiste', 'category', 'countries', 'tickets'];
  openTab = 'status';
  eventStatuses: any;

  layoutSub = new Subscription();
  isMobile = false;
  currentUser: any;
  eventStatusSource: any;
  displayColumns = ['select', 'id', 'name', 'action'];


  constructor(private layoutService: LayoutService,
              private eventStatusService: EventStatusService,
              private authService: AuthenticationService,
              private uiService: UiService,
              private router: Router,
              private baseService: BaseService) {
    this.initializeStatusData().then();
  }

  ngOnInit(): void {
    this.layoutSub = this.layoutService.handsetLayout$.subscribe(x => this.isMobile = x.matches);
    this.currentUser = this.authService.currentUserValue;
    this.eventStatusService.status$.subscribe(
      statusesData => {
        this.eventStatuses = statusesData.data;
        this.dtTrigger.next();
      },
      error => {
        this.uiService.openSnotify(error, 'Error fetching event status', 'error');
      }
    );
    console.log('Event status', this.eventStatusService.status$);
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      searchDelay: 100,
      processing: true,
      searching: true,
      responsive: true,
      deferLoading: 100
    };
  }

  switchTab(tabName: string): void {
    this.openTab = tabName;
  }

  private async initializeStatusData(): Promise<void> {
    await this.eventStatusService.status$.subscribe(
      response => {
        console.log('this.organizerEvents ', response.data);
        this.eventStatuses = response.data;
        this.eventStatusSource = new MatTableDataSource<EventData>(this.prepareEventStatusTableDataSource());
      },
      error => {
        const errorMessage = this.baseService.processResponseError(error) ?? 'Error fetching status.';
        this.uiService.openSnotify(errorMessage, 'Error', 'error');
      },
    );
  }

  private prepareEventStatusTableDataSource(): any[] {
    const eventContainer: EventData[] = [];
    this.eventStatuses.forEach((event: any) => {
      const tempEvent: EventData = {
        id: event.id,
        name: event.name,
        action: [
          {label: 'View', link: `${event.id}/edit/dashboard`},
          {label: 'Edit', link: `${event.id}/edit/details`},
          {label: 'Delete', link: ''},
        ]
      };
      eventContainer.push(tempEvent);
    });
    return eventContainer;
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

  openMenu(path: string): void {
    this.router.navigateByUrl(`/events/${path}`);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
