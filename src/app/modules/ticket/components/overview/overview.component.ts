import { Component, OnInit } from '@angular/core';
import {UiService} from '../../../shared/core/ui.service';
import {SellTicketModalComponent} from '../../../shared/components/sell-ticket-modal/sell-ticket-modal.component';
import {Subscription} from 'rxjs';
import {LayoutService} from '../../../shared/facades/layout.service';
import {TicketFacade} from '../../facade/ticket-facade';
import {AuthenticationService} from '../../../shared/facades/authentication.service';
import {AttendeeTicketTableData, TicketResellDialogResult} from '../../../shared/models/custom-types';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {BaseService} from '../../../shared/facades/base.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  tickets = [
    {
      name: '30 Billion Concert II',
      date: new Date(),
      quantity: 30,
    },
    {
      name: 'Inventors NG Ideas Hunt 2021',
      date: new Date(),
      quantity: 17,
    }
  ];
  currentUser = this.authService.currentUserValue;
  attendeeTickets: any[] = [];
  attendeeTicketsMovie: any[] = [];
  ticketsTableSource: any;
  ticketsTableSourceMovie: any;
  displayColumns = ['name', 'date', 'qty'];
  layoutSub = new Subscription();
  isMobile = false;

  private constructModalPayload = (ticket: AttendeeTicketTableData) => {
    return {
      eventTitle: ticket.eventName,
      datePurchased: ticket.date,
      quantity: ticket.quantity,
    };
  }

  constructor(private authService: AuthenticationService,
              private uiService: UiService,
              private layoutService: LayoutService,
              private ticketFacade: TicketFacade,
              private baseService: BaseService) {
    this.initializeAttendeeOpenTickets().then();
    this.initializeAttendeeOpenTicketsMovie().then();
  }

  ngOnInit(): void {
    this.layoutSub = this.layoutService.handsetLayout$.subscribe(x => this.isMobile = x.matches);
  }

  private async initializeAttendeeOpenTickets(): Promise<void> {
    await this.ticketFacade.getAttendeeTicketsOverview(this.currentUser.id).subscribe(
      response => {
        this.attendeeTickets = response.data;
        this.ticketsTableSource = new MatTableDataSource<AttendeeTicketTableData>(this.prepareAttendeeOpenTicketsTableDataSource());
      },
      error => {
        const errorMessage = this.baseService.processResponseError(error) ?? 'Error fetching tickets';
        this.uiService.openSnotify(errorMessage, 'Error', 'warning');
      }
    );
  }
  private async initializeAttendeeOpenTicketsMovie(): Promise<void> {
    await this.ticketFacade.getAttendeeTicketsOverviewMovie(this.currentUser.id).subscribe(
      response => {
        this.attendeeTicketsMovie = response.data;
        // tslint:disable-next-line:max-line-length
        this.ticketsTableSourceMovie = new MatTableDataSource<AttendeeTicketTableData>(this.prepareAttendeeOpenTicketsTableDataSourceMovie());
      },
      error => {
        const errorMessage = this.baseService.processResponseError(error) ?? 'Error fetching tickets';
        this.uiService.openSnotify(errorMessage, 'Error', 'warning');
      }
    );
  }

  private prepareAttendeeOpenTicketsTableDataSource(): any[] {
    const ticketsArray: any[] = [];
    this.attendeeTickets.forEach(ticket => {
      const tempTicket: AttendeeTicketTableData = {
        ticketId: ticket.id,
        eventName: ticket.event.name,
        date: ticket.event.start_date,
        quantity: ticket.pivot.quantity,
        ticketType: ticket.title,
        price: ticket.pivot.price,
        status: 'paid'
      };

      ticketsArray.push(tempTicket);
    });

    return ticketsArray;
  }
  private prepareAttendeeOpenTicketsTableDataSourceMovie(): any[] {
    const ticketsArray: any[] = [];
    this.attendeeTicketsMovie.forEach(ticket => {
      const tempTicket: AttendeeTicketTableData = {
        ticketId: ticket.id,
        eventName: ticket.event.name,
        date: ticket.event.start_date,
        quantity: ticket.pivot.quantity,
        ticketType: ticket.title,
        price: ticket.pivot.price,
        status: 'paid'
      };

      ticketsArray.push(tempTicket);
    });

    return ticketsArray;
  }


}
