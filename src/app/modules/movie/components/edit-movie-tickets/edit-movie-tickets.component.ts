import {Component, OnDestroy, OnInit} from '@angular/core';
import {MovieTicketType, LocalStorageItems} from '../../../shared/models/enums';
import {UiService} from '../../../shared/core/ui.service';
import {TicketSettingModalComponent} from '../../../shared/components/ticket-setting-modal/ticket-setting-modal.component';
import {LayoutService} from '../../../shared/facades/layout.service';
import {Subscription} from 'rxjs';
import {BaseService} from '../../../shared/facades/base.service';
import {ActivatedRoute} from '@angular/router';
import {MovieFacadeService} from '../../facades/movie-facade.service';


@Component({
  selector: 'app-edit-movie-tickets',
  templateUrl: './edit-movie-tickets.component.html',
  styleUrls: ['./edit-movie-tickets.component.scss']
})
export class EditMovieTicketsComponent implements OnInit, OnDestroy {

  createdMovie = this.route.snapshot.data.event.data;
  pricingMethod = {
    fixed: true,
    dynamic: false
  };
  movieHasTickets: boolean = this.createdMovie.tickets.length > 0;
  isLoading = false;
  ticketPanelOpened = false;
  isMobile = false;
  layoutSub = new Subscription();
  selectedTicketType = MovieTicketType.FREE;
  toolTipText = 'In Dynamic Ticketing, demand and supply controls the price of your ticket, ' +
    'in other to sell out tickets prices would be reduced for the tickets to be sold-out';


  constructor(private uiService: UiService,
              private layoutService: LayoutService,
              private baseService: BaseService,
              private route: ActivatedRoute,
              private movieFacade: MovieFacadeService) { }

  ngOnInit(): void {
    this.uiService.isBusy$.subscribe(isBusy => this.isLoading = isBusy);
    this.layoutSub = this.layoutService.handsetLayout$.subscribe(x => this.isMobile = x.matches);
  }

  selectPricingMethod(pricingMethod: string): void {
    switch (pricingMethod) {
      case 'fixed':
        this.togglePricingMethod('fixed');
        break;
      case  'dynamic':
        this.togglePricingMethod('dynamic');
        break;
    }
  }

  selectTicketType(type: string): void {
    switch (type) {
      case MovieTicketType.FREE:
        this.selectedTicketType = MovieTicketType.FREE;
        break;
      case MovieTicketType.PAID:
        this.selectedTicketType = MovieTicketType.PAID;
        break;
      case MovieTicketType.INVITE:
        this.selectedTicketType = MovieTicketType.INVITE;
        break;
    }
  }

  private selectedTicketTypeValue(): number {
    switch (this.selectedTicketType) {
      case MovieTicketType.PAID:
        return 2;
      case MovieTicketType.INVITE:
        return 3;
      default:
        return 1;
    }
  }

  private selectedPricingMethodValue(): number {
    let method =  '';
    for (const [prop, val] of Object.entries(this.pricingMethod)) {
      // @ts-ignore
      if (this.pricingMethod[prop] === true) {
        method = prop;
      }
    }
    return method === 'dynamic' ? 2 : 1;
  }

  openTicketSettingModal(): void {
    const dialogRef = this.uiService.openDialog(TicketSettingModalComponent, this.isMobile, null);
    dialogRef.afterClosed().subscribe(
      ticketSettingPayload => {
        if (ticketSettingPayload) {
          this.baseService.storeLocalItem(LocalStorageItems.MOVIE_TICKET_SETTING, JSON.stringify(ticketSettingPayload));
          console.log('Ticket settings: ', ticketSettingPayload);
          this.uiService.openSnackBar('Data successfully saved.', 'OK');
        } else {
          this.uiService.openSnotify('Ticket setting set up was not completed. Please try again.', 'Prompt', 'info');
        }
      }
    );
  }

  saveTicketData(movie: any): void {
    if (movie) {
      this.baseService.storeLocalItem(LocalStorageItems.MOVIE_TICKET_DATA, JSON.stringify(movie));
      this.uiService.openSnackBar('Saved successfully. Proceed to add ticket setting', 'OK');
    }
  }

  onCancel(): void {}

  quantityType(): void {
    const localMovieTicketData = JSON.parse(this.baseService.getLocalItem(LocalStorageItems.MOVIE_TICKET_DATA));
    if (localMovieTicketData.quantity === 2000000){
      localMovieTicketData.quantity_type = 1;
    }else{
      localMovieTicketData.quantity_type = 2;
    }
  }

  createMovieTicket(): void {
    const localMovieTicketData = JSON.parse(this.baseService.getLocalItem(LocalStorageItems.MOVIE_TICKET_DATA));
    const localMovieTicketSetting = JSON.parse(this.baseService.getLocalItem(LocalStorageItems.MOVIE_TICKET_SETTING));
    if (!localMovieTicketData) {
      this.uiService.openSnotify('You have not filled the necessary data to create ticket for your movie.', 'Attention', 'info');
      return;
    }

    // 1. Create Ticket
    const payload = {
      title: localMovieTicketData.title,
      description: localMovieTicketData.description,
      quantity_type: this.quantityType(),
      quantity: localMovieTicketData.quantity,
      type: String(this.selectedTicketTypeValue()),
      pricing: String(this.selectedPricingMethodValue()),
      price: localMovieTicketData.price,
      ticket_setting: {
        sales_start: localMovieTicketSetting.salesStart,
        sales_end: localMovieTicketSetting.salesEnd,
        status: localMovieTicketSetting.status === 'public' ? 1 : 0,
        allowed_per_order_min: localMovieTicketSetting.minimumPerOrder,
        allowed_per_order_max: localMovieTicketSetting.maximumPerOrder,
        sales_channel: localMovieTicketSetting.channel === 'online' ? 1 : 2
      }
    };

    this.uiService.busy = true;
    this.movieFacade.createMovieTicketWithSettings(payload, this.createdMovie.id).subscribe(
      createdTicket => {
        this.uiService.busy = false;
        this.uiService.openSnotify('Ticket successfully added. You may add as many as possible', 'Success', 'success');
        this.baseService.removeLocalItem(LocalStorageItems.MOVIE_TICKET_DATA);
        this.baseService.removeLocalItem(LocalStorageItems.MOVIE_TICKET_SETTING);
      },
      error => {
        this.uiService.busy = false;
        const errorMessage = this.baseService.processResponseError(error);
        this.uiService.openSnotify(errorMessage, 'OOPS', 'error');
      }
    );
  }

  private togglePricingMethod(method: string): void {
    for (const [key, val] of Object.entries(this.pricingMethod)) {
      // @ts-ignore
      this.pricingMethod[key] = key === method;
    }
  }

  ngOnDestroy(): void {
  }

}
