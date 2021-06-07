import {Injectable} from '@angular/core';
import {MovieService} from '../apis/movie.service';
import {BehaviorSubject, EMPTY, Observable, of} from 'rxjs';
import {Movie} from '../models/movie.model';
import {LocationService} from '../../shared/apis/location.service';
import {UiService} from '../../shared/core/ui.service';
import {BaseService} from '../../shared/facades/base.service';
import {OrganizerService} from '../../user/apis/organizer.service';
import {AttendeeService} from '../../user/apis/attendee.service';
import {ArtisteService} from '../../user/apis/artiste.service';

@Injectable({
  providedIn: 'root'
})
export class MovieFacadeService {

  movieCreationCompletedSubject = new BehaviorSubject<boolean>(false);
  movieCreationComplete$ = this.movieCreationCompletedSubject.asObservable();
  movies$: Observable<Movie[]>;
  movie$: Observable<Movie> | undefined;
  countries$ = this.movieService.getActiveCountries();
  genres$ = this.movieService.getMovieGenres();
  restrictions$ = this.movieService.getMovieRestrictions();
  artistes$ = this.movieService.getArtistes();

  constructor(private movieService: MovieService,
              private locationService: LocationService,
              private uiService: UiService,
              private baseService: BaseService,
              private organizerService: OrganizerService,
              private attendeeService: AttendeeService,
              private artisteService: ArtisteService) {
    this.movies$ = this.movieService.getMovies();
  }

  getMovie(id: number): void {
    this.movie$ = this.movieService.getMovie(id);
  }

  getAllMovies(): Observable<any> {
    return this.movieService.getMovies();
  }

  getSimilarMovies(event: number): Observable<any> {
    return this.movieService.getSimilarMovies(event);
  }

  getCountryStates(countryId: number): Observable<any> {
    return this.locationService.getCountryStates(countryId);
  }

  createMovie(event: any): Observable<any> {
    return this.movieService.addMovie(event);
  }

  updateMovie(event: any): Observable<any> {
    console.log('Movie ID ', event.id);
    return this.movieService.updateMovie(event);
  }

  /*
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
   */

  getOrganizerEvent(organizerId: any): Observable<any> {
    return this.organizerService.getOrganizerEvents(+organizerId);
  }

  getOrganizerUncompletedMovies(organizerId: any): Observable<any> {
    return this.organizerService.getOrganizerUncompletedMovies(+organizerId);
  }

  /*
  uploadEventsImages(payload: any, eventId: any): Observable<any> {
    console.log('Payload => ', payload);
    return this.eventService.uploadEventImages(payload, +eventId);
  }
  createSlideImage(payload: any): Observable<any> {
    console.log('Payload => ', payload);
    return this.eventService.createSlideImage(payload);
  }
   */

  getAttendeeEvents(attendeeId: any): Observable<any> {
    return this.attendeeService.getAttendeeEvents(+attendeeId);
  }

  getArtisteEvents(artisteId: any): Observable<any> {
    return this.artisteService.getArtisteEvents(+artisteId);
  }

  createArtisteData(payload: any): Observable<any> {
    return this.artisteService.createArtisteData(payload);
  }

  deleteArtisteData(payload: number): Observable<any> {
    return this.artisteService.deleteArtisteData(payload);
  }

  /*
  deleteEventStatus(payload: number): Observable<any> {
    return this.eventService.deleteEventStatus(payload);
  }

  createEventStatus(payload: any): Observable<any> {
    return this.eventService.createEventStatus(payload);
  }

  approveEvent(eventId: any): Observable<any> {
    return this.eventService.approveEvent(+eventId);
  }

  searchEvent(payload: any): Observable<any> {
    console.log(payload);
    return this.eventService.searchEvent(payload);
  }
   */

}