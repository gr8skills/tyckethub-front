import {Component, OnDestroy, OnInit} from '@angular/core';
import {EventTicketType, LocalStorageItems} from '../../../shared/models/enums';
import {UiService} from '../../../shared/core/ui.service';
import {TicketSettingModalComponent} from '../../../shared/components/ticket-setting-modal/ticket-setting-modal.component';
import {LayoutService} from '../../../shared/facades/layout.service';
import {Subscription} from 'rxjs';
import {BaseService} from '../../../shared/facades/base.service';
import {ActivatedRoute} from '@angular/router';
import {EventFacadeService} from '../../facades/event-facade.service';

@Component({
  selector: 'app-edit-event-tickets',
  templateUrl: './edit-event-tickets.component.html',
  styleUrls: ['./edit-event-tickets.component.scss']
})
export class EditEventTicketsComponent implements OnInit, OnDestroy {

  createdEvent = this.route.snapshot.data.event.data;
  pricingMethod = {
    fixed: true,
    dynamic: false
  };
  eventHasTickets: boolean = this.createdEvent.tickets.length > 0;
  isLoading = false;
  ticketPanelOpened = false;
  isMobile = false;
  layoutSub = new Subscription();
  selectedTicketType = EventTicketType.FREE;
  toolTipText = 'In Dynamic Ticketing, demand and supply controls the price of your ticket, ' +
    'in other to sell out tickets prices would be reduced for the tickets to be sold-out';

  constructor(private uiService: UiService,
              private layoutService: LayoutService,
              private baseService: BaseService,
              private route: ActivatedRoute,
              private eventFacade: EventFacadeService) {
  }

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
      case EventTicketType.FREE:
        this.selectedTicketType = EventTicketType.FREE;
        break;
      case EventTicketType.PAID:
        this.selectedTicketType = EventTicketType.PAID;
        break;
      case EventTicketType.INVITE:
        this.selectedTicketType = EventTicketType.INVITE;
        break;
    }
  }

  private selectedTicketTypeValue(): number {
    switch (this.selectedTicketType) {
      case EventTicketType.PAID:
        return 2;
      case EventTicketType.INVITE:
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
          this.baseService.storeLocalItem(LocalStorageItems.EVENT_TICKET_SETTING, JSON.stringify(ticketSettingPayload));
          this.uiService.openSnackBar('Data successfully saved.', 'OK');
        } else {
          this.uiService.openSnotify('Ticket setting set up was not completed. Please try again.', 'Prompt', 'info');
        }
      }
    );
  }

  saveTicketData(event: any): void {
    if (event) {
      this.baseService.storeLocalItem(LocalStorageItems.EVENT_TICKET_DATA, JSON.stringify(event));
      this.uiService.openSnackBar('Saved successfully. Proceed to add ticket setting', 'OK');
    }
  }

  onCancel(): void {}

  createEventTicket(): void {
    const localEventTicketData = JSON.parse(this.baseService.getLocalItem(LocalStorageItems.EVENT_TICKET_DATA));
    const localEventTicketSetting = JSON.parse(this.baseService.getLocalItem(LocalStorageItems.EVENT_TICKET_SETTING));
    if (!localEventTicketData) {
      this.uiService.openSnotify('You have not filled the necessary data to create ticket for your event.', 'Attention', 'info');
      return;
    }

    // 1. Create Ticket
    const payload = {
      title: localEventTicketData.title,
      description: localEventTicketData.description,
      quantity_type: localEventTicketData.quantity,
      type: String(this.selectedTicketTypeValue()),
      pricing: String(this.selectedPricingMethodValue()),
      price: localEventTicketData.price,
      ticket_setting: {
        sales_start: localEventTicketSetting.salesStart,
        sales_end: localEventTicketSetting.salesEnd,
        status: localEventTicketSetting.status === 'public' ? 1 : 0,
        allowed_per_order_min: localEventTicketSetting.minimumPerOrder,
        allowed_per_order_max: localEventTicketSetting.maximumPerOrder,
        sales_channel: localEventTicketSetting.channel === 'online' ? 1 : 2
      }
    };

    this.uiService.busy = true;
    this.eventFacade.createEventTicketWithSettings(payload, this.createdEvent.id).subscribe(
      createdTicket => {
        this.uiService.busy = false;
        this.uiService.openSnotify('Ticket successfully added. You may add as many as possible', 'Success', 'success');
        this.baseService.removeLocalItem(LocalStorageItems.EVENT_TICKET_DATA);
        this.baseService.removeLocalItem(LocalStorageItems.EVENT_TICKET_SETTING);
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
    this.layoutSub.unsubscribe();
  }
}
