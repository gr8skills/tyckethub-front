import {Component, OnDestroy, OnInit} from '@angular/core';
import {EVENTS, EVENTS_MORE, FLIGHTS, MORE_FLIGHTS, MOVIES} from '../modules/shared/data';
import {Flight, FlightType} from '../modules/flight/models/flight.model';
import {Event} from '../modules/event/models/event.model';
import {Movie} from '../modules/movie/models/movie.model';
import {LayoutService} from '../modules/shared/facades/layout.service';
import {UiService} from '../modules/shared/core/ui.service';
import {Subscription} from 'rxjs';
import {EventFacadeService} from '../modules/event/facades/event-facade.service';
import {AuthenticationService} from '../modules/shared/facades/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {

  currentUser = this.authService.currentUserValue;
  carouselImages = [
    'assets/images/img_102.png',
    'assets/images/img_103.jpg',
    'assets/images/img_104.jpg'
  ];

  events: Event[] = [...EVENTS, ...EVENTS_MORE];
  flights: Flight[] = [...FLIGHTS, ...MORE_FLIGHTS];
  movies: Movie[] = [...MOVIES];
  // eventsDynamic$ = this.eventFacade.getAllEvents();
  layoutServiceSub = new Subscription();
  slickSlideConfig = {
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000
  };
  slickMoviesSlideConfig: any;
  eventCreationProgressSub = new Subscription();

  displayStyle = {};

  constructor(private layoutService: LayoutService,
              private uiService: UiService,
              private eventFacade: EventFacadeService,
              private authService: AuthenticationService) {
    this.flights = this.flights.filter(flight => flight.type !== FlightType.Featured);
    this.slickMoviesSlideConfig = {...this.slickSlideConfig};
  }

  ngOnInit(): void {
    this.slickMoviesSlideConfig.slidesToShow = 4;
    this.layoutServiceSub = this.layoutService.handsetLayout$.subscribe(match => {
      if (match.matches) {
        this.slickSlideConfig.slidesToShow = 1;
      }
    });
    if ((this.currentUser && this.currentUser.role === 'organizer') || (this.currentUser && this.currentUser.role === 'admin')) {
      this.init();
    }
    console.log('CURRENT USER ', this.currentUser);
  }

  private async init(): Promise<void> {
    await this.eventFacade.getOrganizerUncompletedEvents(this.currentUser.id).subscribe(
      response => {
        const events: any[] = response.data;
        console.log('Uncompleted Event ', events);
        if (events.length > 0) {
          this.uiService.openSnotify('You have an event that requires you to complete the creation process.',
            'Attention', 'info');
        }
      },
      error => {
        console.log(error);
      });
  }

  private async fetchAndPopulateEvents(): Promise<void> {

  }

  toggleSearchBox(toggleState: boolean): void {
    if (toggleState) {
      this.displayStyle = {display: 'block'};
    } else {
      this.displayStyle = {display: 'none'};
    }
  }

  ngOnDestroy(): void {
    this.layoutServiceSub.unsubscribe();
    this.eventCreationProgressSub.unsubscribe();
  }
}
