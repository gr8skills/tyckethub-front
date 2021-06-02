import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Subject} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UiService} from '../../core/ui.service';
import validate = WebAssembly.validate;
import {allOfValidator} from '@rxweb/reactive-form-validators/reactive-form-validators';
import {EventImageTypes} from '../../models/enums';
import {EventFacadeService} from "../../../event/facades/event-facade.service";
import {BaseService} from "../../facades/base.service";

@Component({
  selector: 'app-homepage-main-slide',
  templateUrl: './homepage-main-slide.component.html',
  styleUrls: ['./homepage-main-slide.component.scss']
})
export class HomepageMainSlideComponent implements OnInit {

  // tslint:disable-next-line:no-output-rename
  @Output('onSubmit') submit = new EventEmitter<any>();

  formErrorSubject = new Subject();
  formErrorValue$ = this.formErrorSubject.asObservable();

  slideCreationForm = new FormGroup({
    imgFile: new FormControl('', [Validators.required]),
    description: new FormControl(''),
  });
  fileNames = {
    banner: '',
    thumb: '',
    mobile: ''
  };

  constructor(private uiService: UiService,
              private eventFacade: EventFacadeService,
              private baseService: BaseService) { }

  ngOnInit(): void {
  }
  save(): void {
    if (this.slideCreationForm.valid) {
      this.submit.emit(this.slideCreationForm.value);
    } else {
      this.formErrorSubject.next(this.slideCreationForm.errors);
      this.submit.emit(null);
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
  processFile(event: any, imageLabel: string): void {
    const imageFile: File = event.target.files[0];

    if (imageFile) {
      this.updateFileNamesLabel(imageLabel, imageFile.name);
      const formData = new FormData();
      formData.set(imageLabel, imageFile);
      this.uiService.busy = true;
      this.eventFacade.createSlideImage(formData).subscribe(
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
}
