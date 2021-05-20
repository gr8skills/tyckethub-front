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
  slickSlideConfig = {
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000
  };
  artistes = [
    {image: 'assets/images/img_127-sm.png', name: 'Burna Boy'},
    {image: 'assets/images/img_128-sm.png', name: 'Tiwa Madness'},
    {image: 'assets/images/img_129-sm.png', name: 'Falz'}
  ];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private baseService: BaseService,
              private uiService: UiService,
              private layoutService: LayoutService,
              private authService: AuthenticationService) {
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

  checkValueLimit(inputElement: HTMLInputElement): void {
    if (!inputElement.value) {
      inputElement.value = String(0);
    }
    if (inputElement.value > inputElement.max) {
      inputElement.value = inputElement.max;
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
      this.router.navigateByUrl('/login');
      return;
    }

    if (!this.canCheckout()) {
      this.uiService.openSnotify('Please choose the amount of ticket you wish to buy', 'Attention', 'warning');
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
