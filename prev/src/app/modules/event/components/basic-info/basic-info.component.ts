import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, Subscription} from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {EventFacadeService} from '../../facades/event-facade.service';
import {LayoutService} from '../../../shared/facades/layout.service';
import {EventDto, RawEventFormValue} from '../../models/event-dto';
import {AuthenticationService} from '../../../shared/facades/authentication.service';
import {BaseService} from '../../../shared/facades/base.service';
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from '@angular/router';
import {UiService} from '../../../shared/core/ui.service';
import {LocalStorageItems} from '../../../shared/models/enums';
import {EventExtraService} from '../../apis/event-extra.service';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss']
})
export class BasicInfoComponent implements OnInit, OnDestroy {
  createdEvent: any = this.route.snapshot.data.event.data;
  layoutSub = new Subscription();
  eventCreationProgressSub = new Subscription();
  countryStatesSubject = new BehaviorSubject<any>({});
  countryStates$ = this.countryStatesSubject.asObservable();
  currentUser = this.authService.currentUserValue;
  loaderSub = new Subscription();
  eventCategories: any;
  ageRestrictions: any;
  artistes: any;
  countries: any;
  countryStates: any;
  formErrorSubject = new BehaviorSubject<boolean>(false);
  formHasError = this.formErrorSubject.asObservable();
  selectedEventTags: string[] = [...this.extractEventTagNames(this.createdEvent?.tags)];
  separatorKeyCode: number[] = [ENTER, COMMA];
  selectable = true;
  removable = true;
  addOnBlur = true;
  isLoading = false;
  locationVenueButtons = {
    live: this.prepareEventLocationPayload(this.createdEvent?.location)?.platform === 1,
    online: this.prepareEventLocationPayload(this.createdEvent?.location)?.platform === 2,
    tobeAnnounced: this.prepareEventLocationPayload(this.createdEvent?.location)?.platform === 3,
  };
  eventInfoForm = new FormGroup({
    title: new FormControl(this.createdEvent.name, [Validators.required]),
    description: new FormControl(this.createdEvent.description, [
      Validators.required,
      Validators.minLength(10)
    ]),
    organizer: new FormControl(!this.createdEvent.organizer ? this.currentUser.name : this.createdEvent.organizer,
      [Validators.required]),
    category: new FormControl(this.extractEventCategoryIds(this.createdEvent.categories), [Validators.required]),
    ageRestriction: new FormControl(''),
    artistes: new FormControl(this.extractEventArtisteIds(this.createdEvent.artistes), [Validators.required]),
    tags: new FormControl(),
    location: new FormGroup({
      address: new FormControl(this.prepareEventLocationPayload(this.createdEvent?.location)?.address, [Validators.required]),
      city: new FormControl(this.prepareEventLocationPayload(this.createdEvent?.location)?.city, [Validators.required]),
      state: new FormControl(this.prepareEventLocationPayload(this.createdEvent?.location)?.state, [Validators.required]),
      country: new FormControl(this.prepareEventLocationPayload(this.createdEvent?.location)?.country, [Validators.required]),
    }),
  });

  controls = {
    title: this.eventInfoForm.controls.title,
    description: this.eventInfoForm.controls.description,
    organizer: this.eventInfoForm.controls.organizer,
    category: this.eventInfoForm.controls.category,
    ageRestriction: this.eventInfoForm.controls.ageRestriction,
    tags: this.eventInfoForm.controls.tags,
    artistes: this.eventInfoForm.controls.artistes,
    address: this.eventInfoForm.get('location.address'),
    city: this.eventInfoForm.get('location.city'),
    state: this.eventInfoForm.get('location.state'),
    country: this.eventInfoForm.get('location.country'),
  };

  onMobile = false;

  constructor(private eventFacade: EventFacadeService,
              private layoutService: LayoutService,
              private authService: AuthenticationService,
              private baseService: BaseService,
              private router: Router,
              private uiService: UiService,
              private route: ActivatedRoute,
              private eventCategoryService: EventExtraService) {
    this.eventFacade.categories$.subscribe(
      eventCats => {
        this.eventCategories = eventCats.data;
      },
      error => {
      }
    );
    this.eventFacade.ageLimits$.subscribe(
        ageLimits => {
          this.ageRestrictions = ageLimits.data;
        },
        error => {

        }
    );
    this.eventFacade.artistes$.subscribe(
      artistesData => {
        this.artistes = artistesData.data;
      },
      error => {
      }
    );
    this.eventFacade.countries$.subscribe(
      countriesData => {
        this.countries = countriesData.data;
      },
      error => {
      }
    );
    this.countryStates$.subscribe(
      stateData => {
        this.countryStates = stateData.data;
      },
      error => {
      }
    );
  }

  ngOnInit(): void {
    // console.log('createdEvent TAGS for the page => ', this.createdEvent.tags);
    // console.log('categories id for the page =>  ', this.extractEventCategoryIds(this.createdEvent.categories));
    this.layoutSub = this.layoutService.handsetLayout$.subscribe(
      match => {
        if (match.matches) {
          this.onMobile = true;
        }
      },
      error => {
        console.log(error);
      }
    );
    this.loaderSub = this.uiService.isBusy$.subscribe(isBusy => this.isLoading = isBusy);
  }

  fetchStates(id: number): void {
    this.eventFacade.getCountryStates(id).subscribe(states => {
      this.countryStatesSubject.next(states);
    });
  }

  addEventTags(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.selectedEventTags.push(value);
    }

    if (input) {
      input.value = '';
    }
  }

  removeEventTag(tag: string): void {
    const index = this.selectedEventTags.indexOf(tag);

    if (index >= 0) {
      this.selectedEventTags.splice(index, 1);
    }
  }

  selectedPlatform(): string {
    let selectedPlatform = '';
    for (const [platform, value] of Object.entries(this.locationVenueButtons)) {
      if (value) {
        selectedPlatform = platform;
      }
    }
    return selectedPlatform;
  }

  updateEvent(): void {
    if (this.createdEvent.is_completed !== 1) {


      this.eventInfoForm.value.tags = this.selectedEventTags;
      this.eventInfoForm.value.id = this.createdEvent.id;
      this.eventInfoForm.value.location.platform = this.selectedPlatform();
      this.eventInfoForm.value.userId = this.authService.currentUserValue.id;
      this.eventInfoForm.value.statusId = 1;
      this.eventInfoForm.value.orgnizer = this.authService.currentUserValue.name;

      if (this.eventInfoForm.valid) {
        const event = new EventDto(this.eventInfoForm.value as RawEventFormValue);
        console.log('EVENT Update PAYLOAD => ', event);
        this.uiService.busy = true;
        this.eventFacade.updateEvent(event).subscribe(
          createdEvent => {
            this.uiService.busy = false;
            console.log('CREATED-EVENT: ', createdEvent);
            this.baseService.storeLocalItem(LocalStorageItems.CREATED_EVENT, JSON.stringify(createdEvent));
            this.router.navigateByUrl(`/events/${this.createdEvent.id}/edit/details`);
          }, error => {
            this.uiService.busy = false;
            const errorMessage = this.baseService.processResponseError(error);
            console.log('Error msg ', errorMessage);
            this.uiService.openSnotify(errorMessage, 'Prompt', 'info');
            if (errorMessage.toLowerCase() === 'no change was made to the event details') {
              setTimeout(() => {
                this.router.navigateByUrl(`/events/${this.createdEvent.id}/edit/details`);
              }, 5200);
            }
          });
      } else {
        this.formErrorSubject.next(true);
        console.log('FORM-ERROR => ', this.eventInfoForm);
        this.uiService.busy = false;
      }
    } else {
      this.router.navigateByUrl(`/events/${this.createdEvent.id}/edit/details`);
    }
  }

  private extractEventCategoryIds(categories: any[]): number[] {
    const catIds: number[] = [];
    categories.forEach(cat => {
      catIds.push(cat.id);
    });
    return catIds;
  }

  private extractEventTagNames(tags: any[]): string[] {
    const tagNames: string[] = [];
    if (tags) {
      tags.forEach(tag => {
        tagNames.push(tag.name);
      });
    }
    return tagNames;
  }

  private extractEventArtisteIds(artistes: any[]): number[] {
    const artisteIds: number[] = [];
    artistes.forEach(artiste => {
      artisteIds.push(artiste.id);
    });
    return artisteIds;
  }

  private prepareEventLocationPayload(location: any): any {
    return {
      address: location.venue_address,
      city: location.city_name,
      state: location.state_id,
      country: location.country_id,
      platform: location.platform
    };
  }

  onCancel(): void {
    this.router.navigate(['/events']);
  }

  selectVenuePlatform(platformLabel: string): void {
    for (const [key, val] of Object.entries(this.locationVenueButtons)) {
      // @ts-ignore
      this.locationVenueButtons[key] = key === platformLabel;
    }
  }

  ngOnDestroy(): void {
    this.layoutSub.unsubscribe();
    this.eventCreationProgressSub.unsubscribe();
    this.loaderSub.unsubscribe();
  }
}
