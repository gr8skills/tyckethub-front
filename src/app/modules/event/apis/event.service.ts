import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Event, IEvent} from '../models/event.model';
import {Observable, of, from, combineLatest, BehaviorSubject} from 'rxjs';
import {EVENTS, EVENTS_MORE} from '../../shared/data';
import {environment} from '../../../../environments/environment';
import {EventStatusService} from './event-status.service';
import {stringify} from "querystring";

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

  getAllEvents(page: number = 1): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.baseUrl}/events?per_page=9&page=${page}`, this.requestOptions);
  }

  getMoreEvents(page: number = 1): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.baseUrl}/more-events?per_page&page=${page}`, this.requestOptions);
  }

  getSimilarEvents(id: number): Observable<any> {
    return this.httpClient.get<any[]>(`${this.baseUrl}/similar-events/${id}`, this.requestOptions);
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

  createEventStatus(payload: any): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/events/status/create`, payload, this.requestOptions);
  }

  deleteEventStatus(payload: any): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/events/status/delete/${payload}`, this.requestOptions);
  }

  approveEvent(eventId: any): Observable<any> {
    let id = parseInt(eventId);
    console.log('Approve ', eventId);
    return this.httpClient.post<any>(`${this.baseUrl}/events/status/${id}/approve`, this.requestOptions);
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

  searchEvent(payload: any): Observable<any> {
    console.log(payload.place);
    let url = '/search/events?event=' + payload.eventName;
    if (payload.place){
      url = url + '&place=' + payload.place;
    }
    if (payload.date){
      url = url + '&date=' + payload.date;
    }
    return this.httpClient.get(`${this.baseUrl + url}`, this.requestOptions);
  }

  createSlideImage(imagePayload: any): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    console.log(imagePayload);
    return this.httpClient.post<any>(`${this.baseUrl}/homepage/slide/image`, imagePayload, {headers});
  }
}
