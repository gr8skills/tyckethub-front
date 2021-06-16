import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
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
  selector: 'app-my-tickets',
  templateUrl: './my-tickets.component.html',
  styleUrls: ['./my-tickets.component.scss']
})

export class MyTicketsComponent implements OnInit, AfterViewInit {
  dtOptions: DataTables.Settings = {};
  @ViewChild(MatPaginator) paginator: MatPaginator;
  tickets = [
    {
      name: '30 Billion Concert II',
      date: new Date(),
      quantity: 30,
      ticketType: 'VVIP',
      ticketId: '00135640',
      price: 300000,
      status: 'paid',
      actions: ['Resell Tickets']
    },
    {
      name: 'Inventors NG Ideas Hunt 2021',
      date: new Date(),
      quantity: 17,
      ticketType: 'REGULAR',
      ticketId: '00000640',
      price: 3000,
      status: 'paid',
      actions: ['Resell Tickets']
    }
  ];

  currentUser = this.authService.currentUserValue;
  attendeeTickets: any[] = [];
  ticketsTableSource: any;
  source: any;
  displayColumns = ['select', 'name', 'date', 'qty', 'type', 'id', 'price', 'status', 'actions'];
  layoutSub = new Subscription();
  isMobile = false;

  private constructModalPayload = (ticket: AttendeeTicketTableData) => {
    return {
      eventTitle: ticket.eventName,
      datePurchased: ticket.date,
      ticketType: ticket.ticketType,
      ticketId: ticket.ticketId,
      recommendedPrice: ticket.price,
      amountPerTicket: ticket.price,
      quantity: ticket.quantity,
      userId: this.currentUser.id,
    };
  }

  constructor(private uiService: UiService,
              private layoutService: LayoutService,
              private ticketFacade: TicketFacade,
              private authService: AuthenticationService,
              private baseService: BaseService) {
    this.initializeAttendeeOpenTickets().then();
  }


  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      searching: false,
    };
    this.ticketsTableSource.paginator = this.paginator;
    this.layoutSub = this.layoutService.handsetLayout$.subscribe(x => this.isMobile = x.matches);
  }

  private async initializeAttendeeOpenTickets(): Promise<void> {
    await this.ticketFacade.getAttendeeTickets(this.currentUser.id).subscribe(
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

  ngAfterViewInit(): void {
    // this.ticketsTableSource = new MatTableDataSource<AttendeeTicketTableData>(this.prepareAttendeeOpenTicketsTableDataSource());
    this.ticketsTableSource.paginator = this.paginator;
  }

  openResellTicketModal(ticket: any): void {
    const data = this.constructModalPayload(ticket);
    const dialogRef = this.uiService.openDialog(SellTicketModalComponent, this.isMobile, data);
    dialogRef.afterClosed().subscribe((dialogResult: TicketResellDialogResult) => {
      console.log('dialogResult => ', dialogResult);

      if (dialogResult.success) {
        this.uiService.openSnotify(dialogResult.response, 'Success', 'success');
      } else {
        this.uiService.openSnotify(dialogResult.response, 'Error', 'error');
      }
    });
  }

}
