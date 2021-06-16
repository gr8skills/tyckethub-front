import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

import {AuthenticationService} from '../../../shared/facades/authentication.service';
import {LocalStorageItems} from '../../../shared/models/enums';
import {BaseService} from '../../../shared/facades/base.service';
import {UiService} from '../../../shared/core/ui.service';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss']
})
export class EditEventComponent implements OnInit {

  createdEvent: any = this.route.snapshot.data.event.data;
  eventStartTime = this.baseService.convertTimeToAMPMFormat(this.createdEvent.start_time);
  userRole: any;
  displayStyle = {};
  currentPath = '';

  constructor(private authService: AuthenticationService,
              private router: Router,
              private route: ActivatedRoute,
              private baseService: BaseService,
              private uiService: UiService) {
  }

  ngOnInit(): void {
    this.userRole = this.authService.currentUserValue.role;
    console.log('Created Event => ', this.createdEvent);
  }

  toggleSearchBox(toggleState: boolean): void {
    if (toggleState) {
      this.displayStyle = {display: 'block'};
    } else {
      this.displayStyle = {display: 'none'};
    }
  }

  navigateToPath(path: string): void {
    switch (path) {
      case 'overview':
        this.currentPath = 'Overview';
        break;
      case 'my-tickets':
        this.currentPath = 'My Tickets';
        break;
      case 'sales':
        this.currentPath = 'My Sales';
        break;
      case 'payments':
        this.currentPath = 'Payments';
        break;
      case 'favorites':
        this.currentPath = 'Favourites';
        break;
      case 'rf-id':
        this.currentPath = 'RF ID';
        break;
      case 'settings':
        this.currentPath = 'Settings';
        break;
    }
  }

  // private checkLocalCreatedEvent(): void {
  //   const createdEvent = JSON.parse(this.baseService.getLocalItem(LocalStorageItems.CREATED_EVENT));
  //   if (!createdEvent) {
  //     this.fetchEventFromResolver();
  //   }
  // }
  //
  // private fetchEventFromResolver(): void {
  //   this.uiService.blockPage();
  //   this.route.data.subscribe(
  //     (response) => {
  //       this.uiService.unBlockPage();
  //       const eventData = response.event.data;
  //       console.log('Fetched DATA => ', eventData);
  //       this.baseService.storeLocalItem(LocalStorageItems.CREATED_EVENT, JSON.stringify(eventData));
  //     },
  //     error => {
  //       this.uiService.unBlockPage();
  //       const errorMessage = this.baseService.processResponseError(error);
  //       console.log('Error ', errorMessage);
  //     });
  // }
}
