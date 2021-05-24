import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {map} from 'rxjs/operators';
import {LayoutService} from '../../../shared/facades/layout.service';
import {EventFacadeService} from '../../facades/event-facade.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {EventDto, RawEventFormValue} from '../../models/event-dto';
import {AuthenticationService} from '../../../shared/facades/authentication.service';
import {BaseService} from '../../../shared/facades/base.service';
import {UiService} from '../../../shared/core/ui.service';
import {EventLocationValidators} from '../../../shared/core/custom-validator';
import {LocalStorageItems} from '../../../shared/models/enums';
import {MatCheckboxChange} from '@angular/material/checkbox';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit, OnDestroy {

  private readonly baseUrl = environment.apiBaseUrl;
  layoutSub = new Subscription();
  eventCreationProgressSub = new Subscription();
  countryStatesSubject = new BehaviorSubject<any>({});
  countryStates$ = this.countryStatesSubject.asObservable();
  loaderSub = new Subscription();
  eventCategories: any;
  eventAgeRestrictions: any;
  artistes: any;
  countries: any;
  countryStates: any;
  formErrorSubject = new BehaviorSubject<boolean>(false);
  formHasError = this.formErrorSubject.asObservable();
  selectedEventTags: string[] = [];
  separatorKeyCode: number[] = [ENTER, COMMA];
  selectable = true;
  removable = true;
  addOnBlur = true;
  isLoading = false;
  currentUser = this.authService.currentUserValue;
  locationVenueButtons = {
    live: true,
    online: false,
    tobeAnnounced: false
  };

  form = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [
      Validators.required,
      Validators.minLength(10)
    ]),
    organizer: new FormControl(null, [Validators.required]),
    category: new FormControl(null, [Validators.required]),
    artistes: new FormControl(''),
    ageRestriction: new FormControl(null),
    tags: new FormControl(),
    location: new FormGroup({
      address: new FormControl(null, []),
      city: new FormControl(null, []),
      state: new FormControl(null, []),
      country: new FormControl(null, []),
    }),
    startDate: new FormControl(null, [Validators.required]),
    endDate: new FormControl(null, [Validators.required]),
    startTime: new FormControl(null, [Validators.required]),
    endTime: new FormControl(null, Validators.required),
    displayStartTime: new FormControl(),
    displayEndTime: new FormControl()
  });


  controls = {
    title: this.form.controls.title,
    description: this.form.controls.description,
    organizer: this.form.controls.organizer,
    category: this.form.controls.category,
    ageRestriction: this.form.controls.ageRestriction,
    tags: this.form.controls.tags,
    artistes: this.form.controls.artistes,
    address: this.form.get('location.address'),
    city: this.form.get('location.city'),
    state: this.form.get('location.state'),
    country: this.form.get('location.country'),
    startDate: this.form.controls.startDate,
    endDate: this.form.controls.endDate,
    startTime: this.form.controls.startTime,
    endTime: this.form.controls.endTime,
    displayStartTime: this.form.controls.displayStartTime,
    displayEndTime: this.form.controls.displayEndTime
  };

  onMobile = false;

  constructor(private router: Router,
              private httpClient: HttpClient,
              private layoutService: LayoutService,
              private eventFacade: EventFacadeService,
              private authService: AuthenticationService,
              private baseService: BaseService,
              private uiService: UiService) {
    this.eventFacade.categories$.subscribe(
      eventCats => {
        this.eventCategories = eventCats.data;
      },
      error => {
      }
    );
    this.eventFacade.restrictions$.subscribe(
      eventRestrictions => {
        this.eventAgeRestrictions = eventRestrictions.data;
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
    this.loaderSub = this.uiService.isBusy$.subscribe(isBusy => this.isLoading = isBusy);
    this.layoutSub = this.layoutService.handsetLayout$.subscribe(x => this.onMobile = x.matches);
    if (this.currentUser) {
      this.init();
    }
  }

  private async init(): Promise<void> {
    this.eventCreationProgressSub = await this.eventFacade.getOrganizerUncompletedEvents(this.currentUser.id).subscribe(
      response => {
        const events: any [] = response.data;
        if (events.length > 0) {
          console.log('Event Id', events[0].id);
          this.router.navigate(['/events', +events[0].id, 'edit', 'details']);
        }
      },
      error => {
        console.log(error);
      }
    );
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

  fetchStates(countryId: number): void {
    this.eventFacade.getCountryStates(countryId).subscribe(states => {
      this.countryStatesSubject.next(states);
    });
  }

  fillInputWithValue(value: MatCheckboxChange): void {
    if (value.checked) {
      this.form.get('organizer')?.setValue(this.authService.currentUserValue.name);
    } else {
      this.form.get('organizer')?.setValue('');
    }
  }

  createEvent(): void {
    this.form.value.tags = this.selectedEventTags;

    this.form.value.location.platform = this.selectedPlatform();
    this.form.value.userId = this.authService.currentUserValue.id;
    this.form.value.statusId = 1;
    this.form.value.startTime = this.baseService.convertInputTimeString(this.form.value.startTime);
    this.form.value.endTime = this.baseService.convertInputTimeString(this.form.value.endTime);

    if (this.form.valid) {
      const event = new EventDto(this.form.value as RawEventFormValue);
      console.log('EVENT PAYLOAD => ', event);
      this.uiService.busy = true;
      this.eventFacade.createEvent(event).subscribe(
        createdEvent => {
          this.uiService.busy = false;
          console.log('CREATED-EVENT: ', createdEvent);
          this.baseService.storeLocalItem(LocalStorageItems.CREATED_EVENT, JSON.stringify(createdEvent.data));
          this.router.navigate(['/events', createdEvent.data.id, 'edit', 'details']).then();
        }, error => {
          this.uiService.busy = false;
          const errorMessage = this.baseService.processResponseError(error) ?? 'Operation failed. Please try again.';
          this.uiService.openSnotify(errorMessage, 'Error', 'error');
        });
    } else {
      this.formErrorSubject.next(true);
      console.log('FORM-ERROR => ', this.form);
    }
  }

  private selectedPlatform(): string {
    let selectedPlatform = '';
    for (const [platform, value] of Object.entries(this.locationVenueButtons)) {
      if (value) {
        selectedPlatform = platform;
      }
    }
    return selectedPlatform;
  }

  onCancel(): void {
    this.router.navigate(['/events']).then(x => x);
  }

  checkEventTitleExists(title: string): Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.baseUrl}/exists/events/${title}`);
  }

  eventTitleValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.checkEventTitleExists(control.value).pipe(
        map(resp => {
          return resp ? {eventTitleExists: true} : null;
        })
      );
    };
  }

  selectVenuePlatform(platformLabel: string): void {
    for (const [key, val] of Object.entries(this.locationVenueButtons)) {
      // @ts-ignore
      this.locationVenueButtons[key] = key === platformLabel;
    }
  }

  ngOnDestroy(): void {
    this.eventCreationProgressSub.unsubscribe();
    this.layoutSub.unsubscribe();
    this.loaderSub.unsubscribe();
  }
}
