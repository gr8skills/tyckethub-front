import {Component, OnInit} from '@angular/core';
import {UiService} from '../../../shared/core/ui.service';
import {BaseService} from '../../../shared/facades/base.service';
import {LocalStorageItems} from '../../../shared/models/enums';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MovieFacadeService} from '../../facades/movie-facade.service';
import {
  MovieOnlinePlatformDto,
  MovieOnlinePlatformExtraDto,
  MovieOnlinePlatformRawExtraFormData,
  MovieOnlinePlatformRawFormData
} from '../../models/movie-online-platform-dto';
import {ActivatedRoute, Router} from '@angular/router';

interface MoviePayload {
  text: HTMLInputElement;
  video: HTMLInputElement;
  linkTitle: HTMLInputElement;
  eventUrl: HTMLInputElement;
}

@Component({
  selector: 'app-online-movie',
  templateUrl: './online-movie.component.html',
  styleUrls: ['./online-movie.component.scss']
})
export class OnlineMovieComponent implements OnInit {

  createdMovie = this.route.snapshot.data.event.data;
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
    movieText: new FormControl(null),
    movieVideo: new FormControl(null),
    movieLinkTitle: new FormControl(null),
    movieUrl: new FormControl(null)
  });
  onlinePlatformLinkData = {};

  constructor(private uiService: UiService,
              private baseService: BaseService,
              private movieFacade: MovieFacadeService,
              private route: ActivatedRoute) { }

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

  save(outputMovie: any): void {
    this.onlinePlatformLinkData = new MovieOnlinePlatformDto(outputMovie);
    console.log('onlinePlatformLinkData ', this.onlinePlatformLinkData);

    this.uiService.busy = true;
    this.movieFacade.createMovieOnlinePlatform(this.onlinePlatformLinkData, this.createdMovie.id)
      .subscribe(createdPlatform => {
          this.uiService.busy = false;
          this.uiService.openSnotify('Movie online platform added successfully.', 'Prompt', 'success');
          this.baseService.storeLocalItem(LocalStorageItems.MOVIE_ONLINE_DETAILS, JSON.stringify(outputMovie));
        },
        error => {
          this.uiService.busy = false;
          const errorMessage = this.baseService.processResponseError(error);
          this.uiService.openSnotify(errorMessage, 'Error', 'info');
        });
  }

  submitMoviesDetails(): void {
    if (this.onlinePlatformCreationForm.valid) {
      const payload = new MovieOnlinePlatformExtraDto(this.onlinePlatformCreationForm.value as MovieOnlinePlatformRawExtraFormData);
      this.uiService.busy = true;
      this.movieFacade.createMovieOnlinePlatformExtra(payload, this.createdMovie.id).subscribe(
        createdPlatformExtra => {
          this.uiService.busy = false;
          this.uiService.openSnotify('Movie online extra added successfully.', 'Prompt', 'success');
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
