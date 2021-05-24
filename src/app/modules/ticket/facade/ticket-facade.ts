import {Injectable} from '@angular/core';
import {OrganizerService} from '../../user/apis/organizer.service';
import {Observable} from 'rxjs';
import {AttendeeService} from '../../user/apis/attendee.service';

@Injectable({
  providedIn: 'root'
})
export class TicketFacade {
  constructor(private organizerService: OrganizerService,
              private attendeeService: AttendeeService) {
  }

  getOrganizerTickets(organizerId: any): Observable<any> {
    return this.organizerService.getOrganizerTickets(+organizerId);
  }

  getAttendeeTickets(attendeeId: any): Observable<any> {
    return this.attendeeService.getAttendeeTickets(+attendeeId);
  }

  attendeeResellTickets(payload: any, attendeeId: any, ticketId: any): Observable<any> {
    return this.attendeeService.resellTickets(payload, +attendeeId, +ticketId);
  }
}
