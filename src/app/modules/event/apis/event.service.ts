import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Event, IEvent} from '../models/event.model';
import {Observable, of, from, combineLatest, BehaviorSubject} from 'rxjs';
import {EVENTS, EVENTS_MORE} from '../../shared/data';
import {environment} from '../../../../environments/environment';
import {EventStatusService} from './event-status.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private readonly baseUrl = environment.apiBaseUrl;
  private readonly requestOptions = environment.httpOptions;

  events = [...EVENTS, ...EVENTS_MORE];

  constructor(private httpClient: HttpClient,
              private eventStatusService: EventStatusService) {
  }

  getEvents(): Observable<Event[]> {
    return of(this.events);
  }

  getAllEvents(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.baseUrl}/events`, this.requestOptions);
  }

  getEvent(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/events/${id}`, this.requestOptions);
  }

  addEvent(event: any): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/events`, event, this.requestOptions);
  }

  updateEvent(event: any): Observable<any> {
    return this.httpClient.patch<any>(`${this.baseUrl}/events/${event.id}`, event, this.requestOptions);
  }

  deleteEvent(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/events/${id}`, this.requestOptions);
  }

  createEventOnlinePlatform(platformPayload: any, eventId: number): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/events/${eventId}/onlinePlatform`, platformPayload, this.requestOptions);
  }

  createEventOnlinePlatformExtra(platformExtraPayload: any, eventId: number): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/events/${eventId}/onlinePlatformExtra`, platformExtraPayload, this.requestOptions);
  }

  getActiveCountries(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/countries/active`, this.requestOptions);
  }

  getEventCategories(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/event-categories`, this.requestOptions);
  }
  getEventRestrictions(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/event-age-restrictions`, this.requestOptions);
  }

  getArtistes(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/artistes`);
  }

  uploadEventImages(imagePayload: any, eventId: number): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    return this.httpClient.post<any>(`${this.baseUrl}/events/${eventId}/images`, imagePayload, {headers});
  }
}
