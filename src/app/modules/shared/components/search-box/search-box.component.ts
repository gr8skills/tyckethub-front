import {Component, OnInit} from '@angular/core';
import {fadeInOnEnterAnimation, fadeOutOnLeaveAnimation} from 'angular-animations';
import {FormControl, FormGroup, FormBuilder, Validator, Validators, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {UiService} from "../../core/ui.service";
import {EventFacadeService} from "../../../event/facades/event-facade.service";
import {BaseService} from "../../facades/base.service";


@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation()
  ]
})
export class SearchBoxComponent implements OnInit {

  tabs = ['events', 'flights', 'movies'];
  openTab = this.tabs[0];
  eventName = '';
  place = '';
  date = '';
  searchPayload = {
    eventName: '',
    place: '',
    date: '',
  };

  constructor(private uiService: UiService,
              private eventFacade: EventFacadeService,
              private router: Router,
              private baseService: BaseService) {
  }

  ngOnInit(): void {
  }

  selectTab(targetTab: string): void {
    this.openTab = targetTab;
    console.clear();
    console.log('OPEN TAB:', this.openTab);
  }

  submit(): void {
    this.searchPayload.eventName = this.eventName;
    this.searchPayload.place = this.place;
    this.searchPayload.date = this.date;
    this.searchEventData();
    console.log(this.searchPayload);
  }

  searchEventData(): void {
    const payload = this.searchPayload;
    console.log('Search Data: ', payload);
    this.uiService.busy = true;
    this.eventFacade.searchEvent(payload).subscribe(
        createdEventStatus => {
          this.uiService.busy = false;
          this.reloadUrlWithComponent();
        },
        error => {
          this.uiService.busy = false;
          const errorMessage = this.baseService.processResponseError(error);
          this.uiService.openSnotify(errorMessage, 'OOPS', 'error');
        }
      );
  }

  reloadUrlWithComponent(): void {
    const currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }
}
