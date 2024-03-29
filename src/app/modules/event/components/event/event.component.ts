import {Component, OnDestroy, OnInit} from '@angular/core';
import {EVENTS_MORE} from '../../../shared/data';
import {Event} from '../../models/event.model';
import {EventFacadeService} from '../../facades/event-facade.service';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {combineLatest, Subscription} from 'rxjs';
import {BaseService} from '../../../shared/facades/base.service';
import {UiService} from '../../../shared/core/ui.service';
import {map, tap} from 'rxjs/operators';
import {AuthenticationService} from '../../../shared/facades/authentication.service';
import {componentFactoryName} from "@angular/compiler";
import {Router} from "@angular/router";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit, OnDestroy {

  moreEvents: Event[] = EVENTS_MORE;
  backendEvent: any;
  backendMoreEvent: any;
  carouselImages: any;
  currentUser = this.authService.currentUserValue;
  events$ = this.eventFacadeService.events$;
  sub = new Subscription();
  eventSub = new Subscription();
  matGridLayoutConfig: { col: number, rowHeight: string, gutterSize: string };
  displayStyle = {};
  page = 1;
  currentIndex = -1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];


  // userEvents$ = this.eventFacadeService.getAttendeeEvents(this.currentUser.id);
  // allEvents$ = this.eventFacadeService.getAllEvents();
  // eventWithFavorites = combineLatest([
  //   this.allEvents$,
  //   this.userEvents$
  // ]).pipe(
  //   map(([allEvents, userEvents]) => {
  //     allEvents.data.forEach((eventData: any) => {
  //       return ({
  //         ...eventData,
  //         isFavorite: userEvents.find((userEventData: any) => userEventData.id === eventData.id)
  //       }) as Event;
  //     });
  //   })
  // ).subscribe(
  //   (combEvents: any) => {
  //     console.log('combEvents ', combEvents);
  //   },
  //   error => {
  //     console.log(error);
  //   });

  eventsDynamic$ = this.eventFacadeService.getAllEvents()
    .pipe(
      map(response => {
        console.log('Resp => ', response);
        const eventsArray = response.data as Array<any>;
        const eventsAbridgedArray: Event[] = [];

        eventsArray.forEach(eventAbridged => {
          eventsAbridgedArray.push(Event.fromJSON(eventAbridged));
        });
        console.log('eventsAbridgedArray => ', eventsAbridgedArray);
        return eventsAbridgedArray;
      })
    );

  eventsMore$ = this.eventFacadeService.getMoreEvents()
    .pipe(
      map(response => {
        const eventsArray = response.data as Array<any>;
        const eventsAbridgedArray: Event[] = [];

        eventsArray.forEach(eventAbridged => {
          eventsAbridgedArray.push(Event.fromJSON(eventAbridged));
        });
        return eventsAbridgedArray;
      })
    );

  userEvents: any;


  constructor(private eventFacadeService: EventFacadeService,
              private breakpointObserver: BreakpointObserver,
              private authService: AuthenticationService,
              private baseService: BaseService,
              private uiService: UiService,
              private router: Router) {
    this.matGridLayoutConfig = {col: 3, rowHeight: '1:1', gutterSize: '20px'};
  }
  retrieveMoreEvents(): void {
    this.eventFacadeService.getMoreEvents().subscribe(eventsData => {
      this.backendMoreEvent = eventsData;
      console.log('backendEventMoreData => ', this.backendMoreEvent.data);
    });
  };

  buildCarouselImages(): [] {
    this.carouselImages = [];
    let $i = -1;
    while (this.backendEvent.data)
    {
      $i++;
      // tslint:disable-next-line
      this.carouselImages.push(this.backendEvent.data[$i]['banner']);
    }
    return this.carouselImages;
  }


  ngOnInit(): void {
    this.events$.subscribe(evts => console.log('EVT ', evts));
    this.eventFacadeService.getAllEvents().subscribe(eventsData => {
      this.backendEvent = eventsData;
      this.buildCarouselImages();
      console.log('backendEventData => ', this.backendEvent.data);
    });
    this.retrieveMoreEvents();

    if (this.currentUser) {
      this.eventFacadeService.getAttendeeEvents(this.currentUser.id).subscribe(
        response => {
          this.userEvents = response.data;
          console.log('this.userEvents ', this.userEvents);
        },
        error => {
          const errorMessage = this.baseService.processResponseError(error) ?? 'Error fetching your events';
          this.uiService.openSnackBar(errorMessage, 'OK');
        }
      );
    }

    this.sub = this.breakpointObserver.observe(Breakpoints.Handset)
      .subscribe(match => {
        if (match.matches) {
          this.matGridLayoutConfig = {col: 1, rowHeight: '1:1', gutterSize: '0px'};
        }
      });
  }

  toggleSearchBox(toggleState: boolean): void {
    console.log('State => ', toggleState);
    if (toggleState) {
      this.displayStyle = {display: 'block'};
    } else {
      this.displayStyle = {display: 'none'};
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.eventSub.unsubscribe();
  }

  onScroll(): void {
    this.page++;
    this.ngOnInit();
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveMoreEvents();
  }

  reloadUrlWithComponent(): void {
    const currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }
}
