import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, Subject, Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {LayoutService} from '../../../shared/facades/layout.service';
import {EventFacadeService} from '../../facades/event-facade.service';
import {AuthenticationService} from '../../../shared/facades/authentication.service';
import {BaseService} from '../../../shared/facades/base.service';
import {UiService} from '../../../shared/core/ui.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {EventImageTypes} from '../../../shared/models/enums';
import {environment} from '../../../../../environments/environment';
import {startWith} from 'rxjs/operators';
import {EventDto, RawEventFormValue} from '../../models/event-dto';
import {EventUploadedImages} from '../../../shared/models/custom-types';

interface EventImage {
  banner: boolean;
  thumb: boolean;
  mobile: boolean;
}


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {
  private endPoint = environment.apiBaseUrl;
  readonly backendPath = environment.backendPath;
  createdEvent: any = this.route.snapshot.data.event.data;
  createdEventImages: EventUploadedImages = this.baseService.processEventImages(this.createdEvent.images);
  isLoading = false;
  fileNames = {
    banner: '',
    thumb: '',
    mobile: ''
  };
  formErrorSubject = new BehaviorSubject<boolean>(false);
  formHasError$ = this.formErrorSubject.asObservable();
  loaderSub = new Subscription();
  layoutSub = new Subscription();
  eventCreationProgressSub = new Subscription();
  onMobile = false;
  uploadedImageSubject = new Subject<EventImage>();
  uploadedImages$ = this.uploadedImageSubject.asObservable().pipe(
    startWith({banner: false, thumb: false, mobile: false})
  );

  eventDetailForm = new FormGroup({
    banner: new FormControl(null, [Validators.required]),
    mobile: new FormControl(null, [Validators.required]),
    thumb: new FormControl(null, [Validators.required]),
  });

  controls = {
    banner: this.eventDetailForm.controls.banner,
    mobile: this.eventDetailForm.controls.mobile,
    thumb: this.eventDetailForm.controls.thumb,
  };

  constructor(private router: Router,
              private layoutService: LayoutService,
              private eventFacade: EventFacadeService,
              private authService: AuthenticationService,
              private baseService: BaseService,
              private uiService: UiService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    console.log('Created Event images', this.createdEventImages);
    console.log('!this.createdEventImages.thumb ', !this.createdEventImages.banner);
    this.layoutService.handsetLayout$.subscribe(
      x => this.onMobile = x.matches,
      error => console.log(error)
    );
  }

  processFile(event: any, imageLabel: string): void {
    const imageFile: File = event.target.files[0];

    if (imageFile) {
      this.updateFileNamesLabel(imageLabel, imageFile.name);
      const formData = new FormData();
      formData.set(imageLabel, imageFile);
      this.uiService.busy = true;
      this.eventFacade.uploadEventsImages(formData, this.createdEvent.id).subscribe(
        response => {
          this.uiService.busy = false;
          this.uiService.openSnotify('Image uploaded successfully.', 'Success', 'success');
        },
        error => {
          this.uiService.busy = false;
          const errorMessage = this.baseService.processResponseError(error) ?? 'Operation failed. Please try again';
          this.uiService.openSnotify(errorMessage, 'Error', 'error');
        }
      );
    }
  }

  private updateFileNamesLabel(imageLabel: string, imageFileName: string): void {
    switch (imageLabel) {
      case EventImageTypes.BANNER:
        this.fileNames.banner = imageFileName;
        break;
      case EventImageTypes.MOBILE:
        this.fileNames.mobile = imageFileName;
        break;
      case EventImageTypes.COVER:
        this.fileNames.thumb = imageFileName;
    }
  }

  onCancel(): void {
    this.router.navigateByUrl('/events');
  }

  onSubmit(): void {
    const path: string = this.createdEvent.location.platform === 2 ? 'online-event' : 'tickets';
    this.router.navigateByUrl(`/events/${this.createdEvent.id}/edit/${path}`);
  }

  ngOnDestroy(): void {
    if (this.loaderSub) {
      this.loaderSub.unsubscribe();
    }
    if (this.layoutSub) {
      this.layoutSub.unsubscribe();
    }
    if (this.eventCreationProgressSub) {
      this.eventCreationProgressSub.unsubscribe();
    }
  }
}
