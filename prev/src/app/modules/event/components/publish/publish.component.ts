import {Component, OnInit} from '@angular/core';
import {BaseService} from '../../../shared/facades/base.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LocalStorageItems} from '../../../shared/models/enums';
import {MatRadioChange} from '@angular/material/radio';
import {UiService} from '../../../shared/core/ui.service';
import {EventFacadeService} from '../../facades/event-facade.service';
import {EventPublishAlertModalComponent} from '../../../shared/components/event-publish-alert-modal/event-publish-alert-modal.component';
import {Subscription} from 'rxjs';
import {LayoutService} from '../../../shared/facades/layout.service';
import {EventUploadedImages} from '../../../shared/models/custom-types';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.scss']
})
export class PublishComponent implements OnInit {

  readonly backendPath = environment.backendPath;
  createdEvent = this.route.snapshot.data.event.data;
  eventStartTime = this.baseService.convertTimeToAMPMFormat(this.createdEvent.start_time);
  createdEventImages: EventUploadedImages = this.baseService.processEventImages(this.createdEvent.images);
  layoutSub = new Subscription();
  tempDate = new Date();
  isLoading = false;
  isMobile = false;
  publishButtonColor = this.createdEvent.is_completed === 1 ? 'accent' : 'primary';

  visibilityLevel = {
    public: true,
    private: false
  };
  publishOptions = {
    now: true,
    schedule: false
  };
  formPayload = {
    visibility: 'public',
    schedule: 'now',
  };

  constructor(private baseService: BaseService,
              private route: ActivatedRoute,
              private uiService: UiService,
              private eventFacade: EventFacadeService,
              private router: Router,
              private layoutService: LayoutService) {
  }

  ngOnInit(): void {
    this.layoutSub = this.layoutService.handsetLayout$.subscribe(x => this.isMobile = x.matches);
    this.uiService.isBusy$.subscribe(isBusy => this.isLoading = isBusy);
  }

  onCancel(): void {

  }

  previewEvent(): void {
    this.router.navigate(['/events', this.createdEvent.id, 'description']);
  }

  publishEvent(): void {
    if (this.createdEvent.is_completed !== 1) {
      this.formPayload.visibility = this.formPayload.visibility === 'public' ? String(1) : String(0);
      this.formPayload.schedule = this.formPayload.schedule === 'now' ? String(1) : String(0);
      console.log('formPayload', this.formPayload);
      this.uiService.busy = true;
      this.eventFacade.publishEvent(this.formPayload, this.createdEvent.id).subscribe(
        publishedEvent => {
          this.uiService.busy = false;
          this.uiService.openSnotify('Event published successfully.', 'Congratulations', 'success');
          this.baseService.removeLocalItem(LocalStorageItems.CREATED_EVENT);
          this.router.navigateByUrl(`/events/${this.createdEvent.id}/edit/dashboard`);
        },
        error => {
          this.uiService.busy = false;
          const errorMessage = this.baseService.processResponseError(error);
          let errorData: any;

          try {
            errorData = JSON.parse(errorMessage);
          } catch (e) {
            console.log('Catch error => ', e);
            errorData = errorMessage ?? 'Operation failed. Please try again later.';
          }
          this.uiService.openDialog(EventPublishAlertModalComponent, this.isMobile, {
            errorData,
            eventId: this.createdEvent.id
          });
        }
      );
    } else {
      this.uiService.openSnotify('Event is already published.', 'Prompt', 'info');
    }
  }

  visibilityChange(event: MatRadioChange): void {
    this.formPayload.visibility = this.selectVisibilityLevel(event.value);
  }

  publishOptionChange(event: MatRadioChange): void {
    this.formPayload.schedule = this.selectPublishOption(event.value);
  }

  private selectVisibilityLevel(visibilityOption: string): string {
    let selectedOption = '';
    for (const [prop, val] of Object.entries(this.visibilityLevel)) {
      // @ts-ignore
      this.visibilityLevel[prop] = prop === visibilityOption;
      // @ts-ignore
      if (this.visibilityLevel[prop] === true) {
        selectedOption = prop;
      }
    }

    return selectedOption;
  }

  private selectPublishOption(publishOption: string): string {
    let selectedOption = '';
    for (const [prop, val] of Object.entries(this.publishOptions)) {
      // @ts-ignore
      this.publishOptions[prop] = prop === publishOption;
      // @ts-ignore
      if (this.publishOptions[prop] === true) {
        selectedOption = prop;
      }
    }

    return selectedOption;
  }
}
