import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AttendeeService {

  private readonly endPoint = environment.apiBaseUrl;
  private readonly requestOptions = environment.httpOptions;

  constructor(private httpClient: HttpClient) {
  }

  getAttendees(): Observable<any> {
    return this.httpClient.get<any>(`${this.endPoint}/attendees`, this.requestOptions);
  }

  getAttendeeEvents(attendeeId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.endPoint}/attendees/${attendeeId}/events`, this.requestOptions);
  }

  purchaseEventTickets(ticketsPayload: any, attendeeId: number): Observable<any> {
    return this.httpClient.post<any>(`${this.endPoint}/attendees/${attendeeId}/purchase-tickets`, ticketsPayload, this.requestOptions);
  }

  getAttendeeTickets(attendeeId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.endPoint}/attendees/${attendeeId}/tickets`, this.requestOptions);
  }

  getAttendeeTicketsOverview(attendeeId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.endPoint}/attendees/${attendeeId}/tickets/overview`, this.requestOptions);
  }

  getAttendeeTicketsOverviewMovie(attendeeId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.endPoint}/attendees/${attendeeId}/tickets/overview-movie`, this.requestOptions);
  }

  resellTickets(payload: any, attendeeId: number, ticketId: number): Observable<any> {
    return this.httpClient.post<any>(`${this.endPoint}/attendees/${attendeeId}/tickets/${ticketId}/re-sell`, payload, this.requestOptions);
  }

  updateTicketTransaction(payload: any, attendeeId: number): Observable<any> {
    console.log('Prepare to update: ', payload);
    return this.httpClient.post<any>(`${this.endPoint}/attendees/${attendeeId}/purchase-tickets/update`, payload, this.requestOptions);
  }
}
