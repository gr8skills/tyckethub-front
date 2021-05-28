import {Component, OnInit} from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseService} from '../../../shared/facades/base.service';
import {UiService} from '../../../shared/core/ui.service';
import {LayoutService} from '../../../shared/facades/layout.service';
import {Subscription} from 'rxjs';
import {AuthenticationService} from '../../../shared/facades/authentication.service';
import {CheckoutModalComponent} from '../../../shared/components/checkout-modal/checkout-modal.component';
import {environment} from '../../../../../environments/environment';
import {EventTicket} from '../../../shared/models/custom-types';
import {LocalStorageItems} from '../../../shared/models/enums';
import {stringify} from 'querystring';
import {EventFacadeService} from '../../facades/event-facade.service';
import {map} from 'rxjs/operators';
import {Event} from '../../models/event.model';

@Component({
  selector: 'app-event-description',
  templateUrl: './event-description.component.html',
  styleUrls: ['./event-description.component.scss']
})
export class EventDescriptionComponent implements OnInit {

  readonly backendPath = environment.backendPath;
  createdEvent = this.route.snapshot.data.event.data;
  createdEventImages = this.baseService.processEventImages(this.createdEvent.images);
  eventStartTime = this.baseService.convertTimeToAMPMFormat(this.createdEvent.start_time);
  eventTickets: EventTicket[] = this.baseService.processEventTickets(this.createdEvent.tickets);
  canCheckOut = false;
  ticketsCount: any;
  layoutSub = new Subscription();
  displayStyle = {};
  isFavorite = false;
  favColor: ThemePalette = 'accent';
  isMobile = false;
  inputValue: any;
  eventId = 21;

  slickSlideConfig = {
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000
  };
  artistes = [
    {image: 'assets/images/img_127-sm.png', name: 'Burna Boy'},
    {image: 'assets/images/img_128-sm.png', name: 'Tiwa Madness'},
    {image: 'assets/images/img_129-sm.png', name: 'Falz'}
  ];

  similarEvents$ = this.eventFacadeService.getSimilarEvents(this.eventId)
    .pipe(
      map(response => {
        console.log('Similar Events: ', response);
        const eventsArray = response as Array<any>;
        const eventsAbridgedArray: Event[] = [];

        eventsArray.forEach(eventAbridged => {
          eventsAbridgedArray.push(Event.fromJSON(eventAbridged));
        });
        return eventsAbridgedArray;
      })
    );

  constructor(private router: Router,
              private route: ActivatedRoute,
              private baseService: BaseService,
              private uiService: UiService,
              private layoutService: LayoutService,
              private authService: AuthenticationService,
              private eventFacadeService: EventFacadeService) {
  }

  ngOnInit(): void {
    this.layoutSub = this.layoutService.handsetLayout$.subscribe(x => this.isMobile = x.matches);
    this.ticketsCount = this.initializeTicketsCount();
    this.canCheckOut = this.canCheckout();
    console.log('this.ticketsCount => ', this.ticketsCount);
  }


  initializeTicketsCount(): any {
    const availableTickets = {};
    this.eventTickets.forEach(ticket => {
      // @ts-ignore
      availableTickets[ticket.title] = 0;
    });

    return availableTickets;
  }

  checkValueLimit(inputElement: HTMLInputElement): boolean {
    this.inputValue = inputElement.value;
    if (!inputElement.value) {
      inputElement.value = String(1);
    }
    const maxInput = parseInt(inputElement.max);
    const currInput = parseInt(inputElement.value);
    if (currInput > maxInput) {
      this.uiService.openSnotify(`Maximum buyable ticket(s) per user (${maxInput}) exceeded`  , 'Attention', 'warning');
      inputElement.value = inputElement.max;
      return false;
    }else {
      return true;
    }
  }

  canCheckout(): boolean {
    let accmTickets = 0;
    for (const [prop, val] of Object.entries(this.ticketsCount)) {
      const intVal = val as number;
      if (intVal > 0) {
        accmTickets += intVal;
      }
    }
    return accmTickets > 0;
  }

  prepareTicketsForCheckout(): any[] {
    const ticketArray: any[] = [];
    const selectedTicket: any[] = [];

    for (const [prop, val] of Object.entries(this.ticketsCount)) {
      const intVal = val as number;
      if (intVal > 0) {
        selectedTicket.push({title: prop, count: intVal});
      }
    }

    if (selectedTicket.length > 0) {
      this.eventTickets.forEach(ticket => {
        const foundTicket: { title: string, count: number } = selectedTicket.find(selTicket =>
          selTicket.title.toLowerCase() === ticket.title.toLowerCase());
        if (foundTicket) {
          ticketArray.push({
            title: ticket.title,
            quantity: foundTicket.count,
            price: ticket.price,
            id: +ticket.id
          });
        }
      });
    }

    return ticketArray;
  }

  toggleSearchBox(toggleState: boolean): void {
    //
  }

  navigateToHome(): void {
    this.router.navigateByUrl('/');
  }

  navigateToArtistesPage(): void {
    this.baseService.navigateToArtistesPage();
  }

  navigateToArtistePage(artisteId: any): void {
    this.router.navigateByUrl(`/tickets/artistes/${artisteId}`);
  }

  toggleFavorite(): void {
    const favThemeColors = {
      warning: 'warn' as ThemePalette,
      accent: 'accent' as ThemePalette
    };
    this.isFavorite = !this.isFavorite;
    this.favColor = this.isFavorite ? favThemeColors.warning : favThemeColors.accent;
  }

  openCheckoutModal(): void {
    if (!this.authService.loggedIn()) {
      this.baseService.storeLocalItem(LocalStorageItems.RETURN_URL, this.router.url);
      console.log(JSON.stringify(this.router.url));
      this.router.navigateByUrl('/login');
      return;
    }

    if (!this.canCheckout()) {
      this.uiService.openSnotify('Please choose the quantity of ticket(s) you wish to buy', 'Attention', 'warning');
      return;
    }
    // tslint:disable-next-line:prefer-const
    let ticketQuantity = this.inputValue;
    if (!this.checkValueLimit(ticketQuantity)) {
      return;
    }
    const data = {
        user: this.authService.currentUserValue,
        ticketData: this.prepareTicketsForCheckout(),
        eventData: this.createdEvent,
      }
    ;
    const dialogRef = this.uiService.openCheckOutDialog(CheckoutModalComponent, this.isMobile, data);
  }
}
