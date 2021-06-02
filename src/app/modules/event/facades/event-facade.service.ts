import {Injectable} from '@angular/core';
import {EventService} from '../apis/event.service';
import {BehaviorSubject, EMPTY, Observable, of} from 'rxjs';
import {Event, IEvent} from '../models/event.model';
import {LocationService} from '../../shared/apis/location.service';
import {UiService} from '../../shared/core/ui.service';
import {BaseService} from '../../shared/facades/base.service';
import {EventExtraService} from '../apis/event-extra.service';
import {OrganizerService} from '../../user/apis/organizer.service';
import {AttendeeService} from '../../user/apis/attendee.service';
import {ArtisteService} from '../../user/apis/artiste.service';

@Injectable({
  providedIn: 'root'
})
export class EventFacadeService {

  eventCreationCompletedSubject = new BehaviorSubject<boolean>(false);
  eventCreationComplete$ = this.eventCreationCompletedSubject.asObservable();
  events$: Observable<Event[]>;
  moreEvents$: Observable<Event[]>;
  event$: Observable<IEvent> | undefined;
  countries$ = this.eventService.getActiveCountries();
  categories$ = this.eventService.getEventCategories();
  restrictions$ = this.eventService.getEventRestrictions();
  artistes$ = this.eventService.getArtistes();

  constructor(private eventService: EventService,
              private locationService: LocationService,
              private uiService: UiService,
              private baseService: BaseService,
              private eventExtraService: EventExtraService,
              private organizerService: OrganizerService,
              private attendeeService: AttendeeService,
              private artisteService: ArtisteService) {
    this.events$ = this.eventService.getAllEvents();
    this.moreEvents$ = this.eventService.getMoreEvents();
  }

  getEvent(id: number): void {
    this.event$ = this.eventService.getEvent(id);
  }

  getAllEvents(): Observable<any> {
    return this.eventService.getAllEvents();
  }
  getMoreEvents(): Observable<any> {
    return this.eventService.getMoreEvents();
  }

  getSimilarEvents(event: number): Observable<any> {
    return this.eventService.getSimilarEvents(event);
  }

  getCountryStates(countryId: number): Observable<any> {
    return this.locationService.getCountryStates(countryId);
  }

  createEvent(event: any): Observable<any> {
    return this.eventService.addEvent(event);
  }

  updateEvent(event: any): Observable<any> {
    console.log('Event ID ', event.id);
    return this.eventService.updateEvent(event);
  }

  createEventOnlinePlatform(payload: any, eventId: any): Observable<any> {
    console.log('Event facade payload ', payload);
    return this.eventService.createEventOnlinePlatform(payload, +eventId);
  }

  createEventOnlinePlatformExtra(payload: any, eventId: any): Observable<any> {
    return this.eventService.createEventOnlinePlatformExtra(payload, +eventId);
  }

  createEventTicketWithSettings(payload: any, eventId: any): Observable<any> {
    return this.eventExtraService.createEventTicketWithSettings(payload, +eventId);
  }

  publishEvent(payload: any, eventId: any): Observable<any> {
    return this.eventExtraService.publishEvent(payload, +eventId);
  }

  unPublishEvent(eventId: any): Observable<any> {
    return this.eventExtraService.unPublishEvent(+eventId);
  }

  getOrganizerEvent(organizerId: any): Observable<any> {
    return this.organizerService.getOrganizerEvents(+organizerId);
  }

  getOrganizerUncompletedEvents(organizerId: any): Observable<any> {
    return this.organizerService.getOrganizerUncompletedEvents(+organizerId);
  }

  uploadEventsImages(payload: any, eventId: any): Observable<any> {
    console.log('Payload => ', payload);
    return this.eventService.uploadEventImages(payload, +eventId);
  }
  createSlideImage(payload: any): Observable<any> {
    console.log('Payload => ', payload);
    return this.eventService.createSlideImage(payload);
  }

  getAttendeeEvents(attendeeId: any): Observable<any> {
    return this.attendeeService.getAttendeeEvents(+attendeeId);
  }

  getArtisteEvents(artisteId: any): Observable<any> {
    return this.artisteService.getArtisteEvents(+artisteId);
  }

  createEventStatus(payload: any): Observable<any> {
    return this.eventService.createEventStatus(payload);
  }

  createArtisteData(payload: any): Observable<any> {
    return this.artisteService.createArtisteData(payload);
  }

  deleteEventStatus(payload: number): Observable<any> {
    return this.eventService.deleteEventStatus(payload);
  }

  approveEvent(eventId: any): Observable<any> {
    return this.eventService.approveEvent(+eventId);
  }

  deleteArtisteData(payload: number): Observable<any> {
    return this.artisteService.deleteArtisteData(payload);
  }

  searchEvent(payload: any): Observable<any> {
    console.log(payload);
    return this.eventService.searchEvent(payload);
  }

}
