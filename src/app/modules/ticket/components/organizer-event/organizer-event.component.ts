import {Component, OnInit, OnDestroy} from '@angular/core';
import {EventStatusService} from '../../../event/apis/event-status.service';
import {UiService} from '../../../shared/core/ui.service';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import {Router} from '@angular/router';
import {EventFacadeService} from '../../../event/facades/event-facade.service';
import {AuthenticationService} from '../../../shared/facades/authentication.service';
import {BaseService} from '../../../shared/facades/base.service';
import {Subject} from 'rxjs';
import {LocalStorageItems} from '../../../shared/models/enums';
import {DeleteModalComponent} from '../../../shared/components/delete-modal/delete-modal.component';

interface EventData {
  id: number;
  date: Date;
  name: string;
  organizer: string;
  approved: string;
  ticketSold: number;
  totalTicket: number;
  revenue: number;
  status: string;
  action: { label: string, link: string, id: number }[];
}

const EVENT_DATA: EventData[] = [
  {
    id: 1,
    date: new Date(),
    name: '30 Billion Concert II',
    organizer: 'Skillz',
    approved: 'No',
    ticketSold: 2,
    totalTicket: 10,
    revenue: 5000,
    status: 'Live',
    action: [
      {
        label: 'View',
        link: '',
        id: 0,
      },
      {
        label: 'Edit',
        link: '2/edit/basic-info',
        id: 0,
      },
      {
        label: 'Copy URL',
        link: '',
        id: 0,
      },
      {
        label: 'Postpone',
        link: '',
        id: 0,
      }
    ]
  }
];

@Component({
  selector: 'app-organizer-event',
  templateUrl: './organizer-event.component.html',
  styleUrls: ['./organizer-event.component.scss']
})
export class OrganizerEventComponent implements OnInit, OnDestroy {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  tabs = ['all events', 'my events'];
  openTab = 'all events';

  eventStatuses: any;
  organizerEvents: any[] = [];
  currentUser: any = this.authService.currentUserValue;
  eventTableSource: any;
  ticketQtySold: any[] = [];
  ticketsQty: any;
  ticketSalesRevenue: any;
  isMobile = false;

  selection = new SelectionModel<any>(true, []);
  dataSource = new MatTableDataSource<EventData>(EVENT_DATA);
  displayColumns = ['select', 'date', 'event', 'organizer', 'approved', 'ticketSold', 'revenue', 'status', 'action'];

  constructor(private eventStatusService: EventStatusService,
              private uiService: UiService,
              private router: Router,
              private eventFacade: EventFacadeService,
              private authService: AuthenticationService,
              private baseService: BaseService) {
    this.initializeOrganizerEvents().then();
  }

  ngOnInit(): void {
    console.log('this.eventTableSource ', this.eventTableSource);
    this.eventStatusService.status$.subscribe(
      statusesData => {
        this.eventStatuses = statusesData.data;
        this.dtTrigger.next();
      },
      error => {
        this.uiService.openSnotify(error, 'Error fetching event status', 'error');
      }
    );
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

  private async initializeOrganizerEvents(): Promise<void> {
    await this.eventFacade.getOrganizerEvent(this.currentUser.id).subscribe(
      response => {
        console.log('this.organizerEvents ', response.data);
        this.organizerEvents = response.data;
        this.eventTableSource = new MatTableDataSource<EventData>(this.prepareOrganizerEventsTableDataSource());
      },
      error => {
        const errorMessage = this.baseService.processResponseError(error) ?? 'Error fetching your events.';
        this.uiService.openSnotify(errorMessage, 'Error', 'error');
      },
    );
  }


  private prepareOrganizerEventsTableDataSource(): any[] {
    const eventContainer: EventData[] = [];
    this.organizerEvents.forEach((event: any) => {
      const tempEvent: EventData = {
        id: event.id,
        date: event.start_date,
        name: event.name,
        organizer: event.organizer,
        approved: event.is_published,
        ticketSold: event.tickets.all_attendees,
        totalTicket: event.tickets.quantity,
        revenue: 0,
        status: event.status,
        action: [
          {label: 'View', link: `${event.id}/edit/dashboard`, id: event.id},
          {label: 'Edit', link: `${event.id}/edit/details`, id: event.id},
          {label: 'Copy URL', link: `${event.id}/edit/details`, id: event.id},
          // tslint:disable-next-line:triple-equals
          {label: event.is_published == 1 ? 'Reject' : 'Approve', link: `approve/${event.id}`, id: event.id}
        ]
      };
      eventContainer.push(tempEvent);
    });
    return eventContainer;
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle(): void {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: EventData): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  openMenu(event: any, path: string, id: number): void {
    console.log('clicked', path);
    if (path.includes('approve')){
      this.baseService.storeLocalItem(LocalStorageItems.ADMIN_APPROVE_EVENT, JSON.stringify(id));
      this.openApproveModal();
    }else {
      this.router.navigateByUrl(`/events/${path}`);
    }
  }

  openApproveModal(): void {
    const dialogRef = this.uiService.openDialog(DeleteModalComponent, this.isMobile, null);
    dialogRef.afterClosed().subscribe(
      approvePayload => {
        if (approvePayload) {
          const payload: number = JSON.parse(this.baseService.getLocalItem(LocalStorageItems.ADMIN_APPROVE_EVENT));
          this.uiService.busy = true;
          console.log('Approve ID ', payload);
          this.eventFacade.approveEvent(payload).subscribe(
            createdEventStatus => {
              this.uiService.busy = false;
              this.uiService.openSnackBar('Event Set successfully.', 'OK');
            },
            error => {
              this.uiService.busy = false;
              const errorMessage = this.baseService.processResponseError(error);
              this.uiService.openSnackBar(errorMessage, 'OK');
            }
          );
          this.baseService.removeLocalItem(LocalStorageItems.ADMIN_APPROVE_EVENT);
          this.router.navigateByUrl('/tickets/organizer/overview').then(() => { this.router.navigateByUrl(`/tickets/organizer/events`); });
        } else {
          this.uiService.openSnackBar('Error setting status', 'OK');
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
