import {Component, OnInit} from '@angular/core';
import {EventStatusService} from '../../../event/apis/event-status.service';
import {UiService} from '../../../shared/core/ui.service';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import {Router} from '@angular/router';
import {EventFacadeService} from '../../../event/facades/event-facade.service';
import {AuthenticationService} from '../../../shared/facades/authentication.service';
import {BaseService} from '../../../shared/facades/base.service';

interface EventData {
  id: number;
  date: Date;
  name: string;
  ticketSold: number;
  totalTicket: number;
  revenue: number;
  status: string;
  action: { label: string, link: string }[];
}

const EVENT_DATA: EventData[] = [
  {
    id: 1,
    date: new Date(),
    name: '30 Billion Concert II',
    ticketSold: 2,
    totalTicket: 10,
    revenue: 5000,
    status: 'Live',
    action: [
      {
        label: 'View',
        link: ''
      },
      {
        label: 'Edit',
        link: '2/edit/basic-info'
      },
      {
        label: 'Copy URL',
        link: ''
      },
      {
        label: 'Postpone',
        link: ''
      }
    ]
  }
];

@Component({
  selector: 'app-organizer-event',
  templateUrl: './organizer-event.component.html',
  styleUrls: ['./organizer-event.component.scss']
})
export class OrganizerEventComponent implements OnInit {

  eventStatuses: any;
  organizerEvents: any[] = [];
  currentUser: any = this.authService.currentUserValue;
  eventTableSource: any;

  selection = new SelectionModel<any>(true, []);
  dataSource = new MatTableDataSource<EventData>(EVENT_DATA);
  displayColumns = ['select', 'date', 'event', 'ticketSold', 'revenue', 'status', 'action'];

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
      },
      error => {
        this.uiService.openSnotify(error, 'Error fetching event status', 'error');
      }
    );
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
        ticketSold: 0,
        totalTicket: 1000,
        revenue: 0,
        status: event.status.name,
        action: [
          {label: 'View', link: `${event.id}/edit/dashboard`},
          {label: 'Edit', link: `${event.id}/edit/details`},
          {label: 'Copy URL', link: ''},
          {label: 'Postpone', link: ''}
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

  openMenu(path: string): void {
    this.router.navigateByUrl(`/events/${path}`);
  }
}
