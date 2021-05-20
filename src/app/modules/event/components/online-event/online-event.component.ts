import {Component, OnInit} from '@angular/core';
import {UiService} from '../../../shared/core/ui.service';
import {BaseService} from '../../../shared/facades/base.service';
import {LocalStorageItems} from '../../../shared/models/enums';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {EventFacadeService} from '../../facades/event-facade.service';
import {
  EventOnlinePlatformDto,
  EventOnlinePlatformExtraDto,
  EventOnlinePlatformRawExtraFormData,
  EventOnlinePlatformRawFormData
} from '../../models/event-online-platform-dto';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-online-event',
  templateUrl: './online-event.component.html',
  styleUrls: ['./online-event.component.scss']
})
export class OnlineEventComponent implements OnInit {

  createdEvent = this.route.snapshot.data.event.data;
  formShown = false;
  platformLabel = '';
  inputFields = {
    text: true,
    image: false,
    video: false,
    link: false
  };
  activeInput = '';
  isLoading = false;
  onlinePlatformCreationForm = new FormGroup({
    eventText: new FormControl(null),
    eventVideo: new FormControl(null),
    eventLinkTitle: new FormControl(null),
    eventUrl: new FormControl(null)
  });
  onlinePlatformLinkData = {};

  constructor(private uiService: UiService,
              private baseService: BaseService,
              private eventFacade: EventFacadeService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activeInput = this.checkActiveInputField();
  }

  toggleForm(platformLabel: string): void {
    if (!this.platformLabel) {
      this.platformLabel = platformLabel;
      this.formShown = true;
      return;
    }

    if (this.platformLabel === platformLabel) {
      this.formShown = !this.formShown;
      return;
    }
    this.platformLabel = platformLabel;
  }

  selectInputFiled(fieldLabel: string): void {
    switch (fieldLabel) {
      case 'text':
        this.toggleInputFields('text');
        break;
      case 'image':
        this.toggleInputFields('image');
        break;
      case 'video':
        this.toggleInputFields('video');
        break;
      case 'link':
        this.toggleInputFields('link');
        break;
    }
  }

  closeForm(): void {
    this.formShown = false;
  }

  save(outputEvent: any): void {
    this.onlinePlatformLinkData = new EventOnlinePlatformDto(outputEvent);
    console.log('onlinePlatformLinkData ', this.onlinePlatformLinkData);

    this.uiService.busy = true;
    this.eventFacade.createEventOnlinePlatform(this.onlinePlatformLinkData, this.createdEvent.id)
      .subscribe(createdPlatform => {
          this.uiService.busy = false;
          this.uiService.openSnotify('Event online platform added successfully.', 'Prompt', 'success');
          this.baseService.storeLocalItem(LocalStorageItems.EVENT_ONLINE_DETAILS, JSON.stringify(outputEvent));
        },
        error => {
          this.uiService.busy = false;
          const errorMessage = this.baseService.processResponseError(error);
          this.uiService.openSnotify(errorMessage, 'Error', 'info');
        });
  }

  submitEventsDetails(): void {
    if (this.onlinePlatformCreationForm.valid) {
      const payload = new EventOnlinePlatformExtraDto(this.onlinePlatformCreationForm.value as EventOnlinePlatformRawExtraFormData);
      this.uiService.busy = true;
      this.eventFacade.createEventOnlinePlatformExtra(payload, this.createdEvent.id).subscribe(
        createdPlatformExtra => {
          this.uiService.busy = false;
          this.uiService.openSnotify('Event online extra added successfully.', 'Prompt', 'success');
        },
        error => {
          this.uiService.busy = false;
          const errorMessage = this.baseService.processResponseError(error);
          this.uiService.openSnotify(errorMessage, 'Error', 'error');
        }
      );
    }
  }

  toggleInputFields(fieldToActivate: string): void {
    for (const [key, value] of Object.entries(this.inputFields)) {
      // @ts-ignore
      this.inputFields[key] = key === fieldToActivate;
    }
    this.activeInput = this.checkActiveInputField();
  }

  onCancel(): void {

  }

  private checkActiveInputField(): string {
    let field = 'text';
    for (const [activeField, value] of Object.entries(this.inputFields)) {
      if (value) {
        field = activeField;
      }
    }
    return field;
  }
}

interface EventPayload {
  text: HTMLInputElement;
  video: HTMLInputElement;
  linkTitle: HTMLInputElement;
  eventUrl: HTMLInputElement;
}
