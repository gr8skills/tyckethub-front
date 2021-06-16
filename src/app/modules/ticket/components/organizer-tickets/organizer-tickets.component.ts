import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {EventStatusService} from '../../../event/apis/event-status.service';
import {UiService} from '../../../shared/core/ui.service';
import {OrganizerTicketTableData} from '../../../shared/models/custom-types';
import {TicketFacade} from '../../facade/ticket-facade';
import {AuthenticationService} from '../../../shared/facades/authentication.service';
import {BaseService} from '../../../shared/facades/base.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-organizer-tickets',
  templateUrl: './organizer-tickets.component.html',
  styleUrls: ['./organizer-tickets.component.scss']
})
export class OrganizerTicketsComponent implements OnInit {
  currentUser: any = this.authService.currentUserValue;
  organizerTickets: any[] = [];
  ticketTableSource: any;
  displayColumns = ['select', 'event', 'ticketSold', 'ticketType', 'ticketId', 'pricePerTicket', 'status'];

  constructor(private eventStatusService: EventStatusService,
              private uiService: UiService,
              private ticketFacade: TicketFacade,
              private authService: AuthenticationService,
              private baseService: BaseService,
              private router: Router) {
    this.initializeOrganizerTickets().then();
  }

  ngOnInit(): void {
    console.log('this.currentUser ', this.currentUser);
    console.log('this.organizerTickets ', this.organizerTickets);
  }

  private async initializeOrganizerTickets(): Promise<void> {
    await this.ticketFacade.getOrganizerTickets(this.currentUser.id).subscribe(
      response => {
        this.organizerTickets = response.data;
        console.log('this.organizerTickets ', this.organizerTickets);
        this.ticketTableSource = new MatTableDataSource<OrganizerTicketTableData>(this.prepareOrganizerTicketsTableDataSource());
      },
      error => {
        const errorMessage = this.baseService.processResponseError(error) ?? 'Error fetching tickets.';
        this.uiService.openSnotify(errorMessage, 'Error', 'error');
      }
    );
  }

  private prepareOrganizerTicketsTableDataSource(): any[] {
    const ticketsArray: any[] = [];
    this.organizerTickets.forEach((ticket: any, index) => {
      const tempTicket: OrganizerTicketTableData = {
        eventName: ticket.event.name,
        ticketSold: 0,
        totalTicket: ticket.quantity,
        ticketType: ticket.title,
        ticketId: '02776' + ticket.id,
        pricePerTicket: ticket.price,
        status: this.mapTicketSettingStatusToString(ticket.event.event_status_id)
      };
      ticketsArray.push(tempTicket);
    });

    return ticketsArray;
  }

  private mapTicketSettingStatusToString(settingStatusNumber: number): string {
    return settingStatusNumber === 1 ? 'Active' : 'Inactive';
  }


  // isAllSelected(): boolean {
  //   const numSelected = this.selection.selected.length;
  //   const numRows = this.dataSource.data.length;
  //   return numSelected === numRows;
  // }
  //
  // masterToggle(): void {
  //   this.isAllSelected() ?
  //     this.selection.clear() :
  //     this.dataSource.data.forEach(row => this.selection.select(row));
  // }
  //
  // checkboxLabel(row?: TicketTableData): string {
  //   if (!row) {
  //     return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
  //   }
  //   return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  // }

}
