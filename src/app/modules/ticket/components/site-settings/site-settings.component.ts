import {Component, OnDestroy, OnInit, AfterViewInit, ViewChild} from '@angular/core';
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
import {BaseService} from '../../../shared/facades/base.service';
import {EventFacadeService} from '../../../event/facades/event-facade.service';
import {SelectionModel} from '@angular/cdk/collections';
import {TicketSettingModalComponent} from '../../../shared/components/ticket-setting-modal/ticket-setting-modal.component';
import {LocalStorageItems} from '../../../shared/models/enums';
import {DeleteModalComponent} from '../../../shared/components/delete-modal/delete-modal.component';
import {ArtisteService} from '../../../user/apis/artiste.service';
import { DataTableDirective } from 'angular-datatables';
interface EventData {
  sn: number;
  id: number;
  name: string;
  action: { label: string, link: number, onclick: any }[];
}
interface ArtisteData {
  sn: number;
  id: number;
  name: string;
  bio: string;
  action: { label: string, link: number}[];
}
interface SlideData {
  sn: number;
  id: number;
  name: string;
  action: { label: string, link: number}[];
}

const EVENT_DATA: EventData[] = [
  {
    sn: 1,
    id: 1,
    name: 'postponed',
    action: [
      {
        label: 'View',
        link: 0,
        onclick: event,
      },
      {
        label: 'Edit',
        link: 0,
        onclick: event,
      },
      {
        label: 'Delete',
        link: 0,
        onclick: event,
      }
    ]
  }
];

const ARTISTE_DATA: ArtisteData[] = [
  {
    sn: 1,
    id: 1,
    name: 'postponed',
    bio: 'A very talented lad',
    action: [
      {
        label: 'View',
        link: 0,
      },
      {
        label: 'Edit',
        link: 0,
      },
      {
        label: 'Delete',
        link: 0,
      }
    ]
  }
];

const SLIDE_DATA: SlideData[] = [
  {
    sn: 1,
    id: 1,
    name: 'clear image',
    action: [
      {
        label: 'View',
        link: 0,
      },
      {
        label: 'Edit',
        link: 0,
      },
      {
        label: 'Delete',
        link: 0,
      }
    ]
  }
];

@Component({
  selector: 'app-site-settings',
  templateUrl: './site-settings.component.html',
  styleUrls: ['./site-settings.component.scss']
})
export class SiteSettingsComponent implements OnInit, OnDestroy, AfterViewInit{
  dtOptions: DataTables.Settings = {};
  dtOptions2: DataTables.Settings = {};
  dtTrigger: Subject<EventData> = new Subject<EventData>();
  dtTrigger2: Subject<ArtisteData> = new Subject<ArtisteData>();
  dtTrigger5: Subject<SlideData> = new Subject<SlideData>();
  tabs = ['status', 'artiste', 'category', 'countries', 'tickets', 'slides'];
  openTab = 'status';
  eventStatuses: any;
  artisteDatas: any;
  slideDatas: any;
  eventStatusAvail: any[] = [];
  artisteDataAvail: any[] = [];
  slideDataAvail: any[] = [];

  layoutSub = new Subscription();
  isMobile = false;
  currentUser: any = this.authService.currentUserValue;
  eventStatusSource: any;
  artisteDataSource: any;
  slideDataSource: any;

  selection = new SelectionModel<any>( true, []);
  dataSource = new MatTableDataSource<EventData>(EVENT_DATA);
  dataSource2 = new MatTableDataSource<ArtisteData>(ARTISTE_DATA);
  dataSource5 = new MatTableDataSource<SlideData>(SLIDE_DATA);
  displayColumns = ['select', 'id', 'name', 'action'];
  displayColumns2 = ['select', 'id', 'name', 'bio', 'action'];
  displayColumns5 = ['select', 'id', 'name', 'action'];


  constructor(private layoutService: LayoutService,
              private eventStatusService: EventStatusService,
              private authService: AuthenticationService,
              private uiService: UiService,
              private router: Router,
              private baseService: BaseService,
              private eventFacade: EventFacadeService,
              private artisteService: ArtisteService) {
    this.initializeStatusData().then();
    this.initializeArtisteData().then();
    this.initializeSlideData().then();
  }

  ngOnInit(): void {
    this.layoutSub = this.layoutService.handsetLayout$.subscribe(x => this.isMobile = x.matches);
    this.currentUser = this.authService.currentUserValue;
    // if (this.openTab === 'artiste') {
    // }
    // if (this.openTab === 'slides'){
    // }

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      searching: true,
      responsive: true,
      dom: 'Bfrtip',
    };

  }

  switchTab(tabName: string): void {
    this.openTab = tabName;
    console.log('Which Tab is this: ', tabName);
    if (this.openTab === 'status'){
      this.eventStatusService.status$.subscribe(
        statusesData => {
          this.eventStatuses = statusesData.data;
          this.dtTrigger.next();
        },
        error => {
          this.uiService.openSnotify(error, 'Error fetching event status', 'error');
        });
      $('myTable1').DataTable();
      // this.rerender(tabName);
    }
    if (this.openTab === 'artiste'){
      this.artisteService.getArtistes().subscribe(
        artisteDatas => {
          this.artisteDatas = artisteDatas.data;
          this.dtTrigger2.next();
        },
        error => {
          this.uiService.openSnotify(error, 'Error fetching artistes', 'error');
        });
      $('myTable2').DataTable();
      // this.ngOnInit();
    }
    if (this.openTab === 'slides'){
      this.authService.getSlides().subscribe(
        slideDatas => {
          this.slideDatas = slideDatas.data;
          this.dtTrigger5.next();
        },
        error => {
          this.uiService.openSnotify(error, 'Error fetching slides', 'error');
        }
      );
      $('myTable5').DataTable();
      // this.ngOnInit();
    }
  }

  private async initializeArtisteData(): Promise<void> {
    await this.artisteService.getArtistes().subscribe(
      response => {
        console.log('this.artisteData ', response.data);
        this.artisteDataAvail = response.data;
        this.artisteDataSource = new MatTableDataSource<ArtisteData>(this.prepareArtisteDataTableDataSource());
      },
      error => {
        const errorMessage = this.baseService.processResponseError(error) ?? 'Error fetching status.';
        this.uiService.openSnotify(errorMessage, 'Error', 'error');
      },
    );
  }

  private async initializeStatusData(): Promise<void> {
      await this.eventStatusService.status$.subscribe(
        response => {
          console.log('this.eventStatus ', response.data);
          this.eventStatusAvail = response.data;
          this.eventStatusSource = new MatTableDataSource<EventData>(this.prepareEventStatusTableDataSource());
        },
        error => {
          const errorMessage = this.baseService.processResponseError(error) ?? 'Error fetching status.';
          this.uiService.openSnotify(errorMessage, 'Error', 'error');
        },
      );
  }

  private async  initializeSlideData(): Promise<void> {
    await this.authService.getSlides().subscribe(
      response => {
        this.slideDataAvail = response.data;
        this.slideDataSource = new MatTableDataSource<SlideData>(this.prepareSlideDataTableDataSource());
      },
      error => {
        const errorMessage = this.baseService.processResponseError(error) ?? 'Error fetching status.';
        this.uiService.openSnotify(errorMessage, 'Error', 'error');
      },
    );
  }

  saveStatusData(event: any): void {
    if (event) {
      const payload = {
        name: event.name,
      };
      this.uiService.busy = true;
      this.eventFacade.createEventStatus(payload).subscribe(
        createdEventStatus => {
          this.uiService.busy = false;
          this.router.navigateByUrl('/tickets/organizer/overview').then(() => { this.router.navigateByUrl(`/tickets/site-settings`); });
          this.uiService.openSnotify('Event successfully added. You may add as many as possible', 'Success', 'success');
        },
        error => {
          this.uiService.busy = false;
          const errorMessage = this.baseService.processResponseError(error);
          this.uiService.openSnotify(errorMessage, 'OOPS', 'error');
        }
      );
    }
  }

  saveArtisteData(event: any): void {
    if (event) {
      const payload = {
        name: event.name,
        bio: event.bio,
      };
      console.log('Artiste Data: ', payload);
      this.uiService.busy = true;
      this.eventFacade.createArtisteData(payload).subscribe(
        createdEventStatus => {
          this.uiService.busy = false;
          this.router.navigateByUrl('/tickets/organizer/overview').then(() => { this.router.navigateByUrl(`/tickets/site-settings`); });
          this.uiService.openSnotify('Artiste successfully added. You may add as many as possible', 'Success', 'success');
        },
        error => {
          this.uiService.busy = false;
          const errorMessage = this.baseService.processResponseError(error);
          this.uiService.openSnotify(errorMessage, 'OOPS', 'error');
        }
      );
    }
  }

  saveSlideData(event: any): void {
    if (event) {
      const payload = {
        imgFile: event.imgFile,
        description: event.description,
      };
      this.uiService.busy = true;
      this.reloadUrlWithComponent();
    }
  }

  private prepareEventStatusTableDataSource(): any[] {
    const eventContainer: EventData[] = [];
    let i = 1;
    this.eventStatusAvail.forEach((event: any) => {
      const tempEvent: EventData = {
        sn: i++,
        id: event.id,
        name: event.name,
        action: [
          {label: 'View', link: event.id, onclick: ''},
          {label: 'Edit', link: event.id, onclick: ''},
          {label: 'Delete', link: event.id, onclick: ``},
        ]
      };
      eventContainer.push(tempEvent);
    });
    return eventContainer;
  }
  private prepareArtisteDataTableDataSource(): any[] {
    const artisteContainer: ArtisteData[] = [];
    let i = 1;
    this.artisteDataAvail.forEach((artiste: any) => {
      const tempArtiste: ArtisteData = {
        sn: i++,
        id: artiste.id,
        name: artiste.name,
        bio: artiste.bio,
        action: [
          {label: 'View', link: artiste.id},
          {label: 'Edit', link: artiste.id},
          {label: 'Delete', link: artiste.id},
        ]
      };
      artisteContainer.push(tempArtiste);
    });
    return artisteContainer;
  }
  private prepareSlideDataTableDataSource(): any[] {
    const slideContainer: SlideData[] = [];
    let i = 1;
    this.slideDataAvail.forEach((slide: any) => {
      const tempSlide: SlideData = {
        sn: i++,
        id: slide.id,
        name: slide.name,
        action: [
          {label: 'View', link: slide.id},
          {label: 'Edit', link: slide.id},
          {label: 'Delete', link: slide.id},
        ]
      };
      slideContainer.push(tempSlide);
    });
    return slideContainer;
  }

  openDeleteModal(): void {
    const dialogRef = this.uiService.openDialog(DeleteModalComponent, this.isMobile, null);
    dialogRef.afterClosed().subscribe(
      deletePayload => {
        if (deletePayload) {
          // tslint:disable-next-line:radix
          const payload: number = parseInt(this.baseService.getLocalItem(LocalStorageItems.DELETE_TABLE_ITEM));
          this.uiService.busy = true;
          this.eventFacade.deleteEventStatus(payload).subscribe(
            createdEventStatus => {
              this.uiService.busy = false;
              this.uiService.openSnackBar('Event Status successfully deleted.', 'OK');
            },
            error => {
              this.uiService.busy = false;
              const errorMessage = this.baseService.processResponseError(error);
              this.uiService.openSnackBar(errorMessage, 'OK');
            }
          );
          this.baseService.removeLocalItem(LocalStorageItems.DELETE_TABLE_ITEM);
          this.router.navigateByUrl('/tickets/organizer/overview').then(() => { this.router.navigateByUrl(`/tickets/site-settings`); });
        } else {
          this.uiService.openSnackBar('Data persisting.', 'OK');
        }
      }
    );
  }

  openDeleteModal2(): void {
    const dialogRef = this.uiService.openDialog(DeleteModalComponent, this.isMobile, null);
    dialogRef.afterClosed().subscribe(
      deletePayload => {
        if (deletePayload) {
          // tslint:disable-next-line:radix
          const payload: number = parseInt(this.baseService.getLocalItem(LocalStorageItems.DELETE_TABLE_ITEM));
          this.uiService.busy = true;
          this.eventFacade.deleteArtisteData(payload).subscribe(
            createdEventStatus => {
              this.uiService.busy = false;
              this.uiService.openSnackBar('Artiste successfully deleted.', 'OK');
            },
            error => {
              this.uiService.busy = false;
              const errorMessage = this.baseService.processResponseError(error);
              this.uiService.openSnackBar(errorMessage, 'OK');
            }
          );
          this.baseService.removeLocalItem(LocalStorageItems.DELETE_TABLE_ITEM);
          this.reloadUrlWithComponent();
          // this.router.navigateByUrl('/tickets/organizer/overview').then(() => { this.router.navigateByUrl(`/tickets/site-settings`); });
        } else {
          this.uiService.openSnackBar('Data persisting.', 'OK');
        }
      }
    );
  }

  reloadUrlWithComponent(): void {
    const currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
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

  openMenu(event: any, path: string): void {
    this.baseService.storeLocalItem(LocalStorageItems.DELETE_TABLE_ITEM, JSON.stringify(path));
    this.openDeleteModal();
    // this.router.navigateByUrl(`/tickets/${path}`);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
    this.dtTrigger2.unsubscribe();
    this.dtTrigger5.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
    this.dtTrigger2.next();
    this.dtTrigger5.next();
  }

  rerender(tabName: string): void {
    if (tabName === 'status'){
      this.eventStatusSource.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next();
      });
    }
    else if (tabName === 'artiste'){
      this.artisteDataSource.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next();
      });
    }else if (tabName === 'slides'){
      this.eventStatusSource.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next();
      });
    }
  }

}
