import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventExtraService {

  private readonly endPoint = environment.apiBaseUrl;
  private readonly requestOptions = environment.httpOptions;

  constructor(private httpClient: HttpClient) {
  }

  getEventCategory(eventId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.endPoint}/events/${eventId}/event-categories`);
  }

  getEventArtistes(eventId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.endPoint}/events/${eventId}/artistes`);
  }

  getEventTags(eventId: number): Observable<any> {
    return  this.httpClient.get<any>(`${this.endPoint}/events/${eventId}/tags`);
  }

  getEventLocation(eventId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.endPoint}/events/${eventId}/locations`);
  }

  getEventDateTimes(eventId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.endPoint}/events/${eventId}`);
  }

  getEventImages(eventId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.endPoint}/events/${eventId}/images`);
  }

  createEventTicketWithSettings(payload: any, eventId: number): Observable<any> {
    return this.httpClient.post<any>(`${this.endPoint}/events/${eventId}/tickets`, payload, this.requestOptions);
  }

  publishEvent(payload: any, eventId: number): Observable<any> {
    return this.httpClient.post<any>(`${this.endPoint}/events/${eventId}/publish`, payload, this.requestOptions);
  }

  unPublishEvent(eventId: number): Observable<any> {
    return this.httpClient.get(`${this.endPoint}/events/${eventId}/unpublish`, this.requestOptions);
  }
}
