import {Component, OnInit} from '@angular/core';
import {BaseService} from '../../../shared/facades/base.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LocalStorageItems} from '../../../shared/models/enums';
import {MatRadioChange} from '@angular/material/radio';
import {UiService} from '../../../shared/core/ui.service';
import {MovieFacadeService} from '../../facades/movie-facade.service';
import {Subscription} from 'rxjs';
import {LayoutService} from '../../../shared/facades/layout.service';
import {MovieUploadedImages} from '../../../shared/models/custom-types';
import {environment} from '../../../../../environments/environment';
import {MoviePublishAlertModalComponent} from '../../../shared/components/movie-publish-alert-modal/movie-publish-alert-modal.component';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.scss']
})
export class PublishComponent implements OnInit {

  readonly backendPath = environment.backendPath;
  createdMovie = this.route.snapshot.data.event.data;
  movieStartTime = this.baseService.convertTimeToAMPMFormat(this.createdMovie.start_time);
  createdMovieImages: MovieUploadedImages = this.baseService.processMovieImages(this.createdMovie.images);
  layoutSub = new Subscription();
  tempDate = new Date();
  isLoading = false;
  isMobile = false;
  publishButtonColor = this.createdMovie.is_completed === 1 ? 'accent' : 'primary';

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
              private movieFacade: MovieFacadeService,
              private router: Router,
              private layoutService: LayoutService) { }

  ngOnInit(): void {
    this.layoutSub = this.layoutService.handsetLayout$.subscribe(x => this.isMobile = x.matches);
    this.uiService.isBusy$.subscribe(isBusy => this.isLoading = isBusy);
  }

  onCancel(): void {
  }

  previewMovie(): void {
    this.router.navigate(['/movies', this.createdMovie.id, 'description']);
  }

  publishMovie(): void {
    if (this.createdMovie.is_completed !== 1) {
      this.formPayload.visibility = this.formPayload.visibility === 'public' ? String(1) : String(0);
      this.formPayload.schedule = this.formPayload.schedule === 'now' ? String(1) : String(0);
      this.uiService.busy = true;
      this.movieFacade.publishMovie(this.formPayload, this.createdMovie.id).subscribe(
        publishedEvent => {
          this.uiService.busy = false;
          this.uiService.openSnotify('Movie published successfully.', 'Congratulations', 'success');
          this.baseService.removeLocalItem(LocalStorageItems.CREATED_MOVIE);
          this.router.navigateByUrl(`/movies/${this.createdMovie.id}/edit/dashboard`);
        },
        error => {
          this.uiService.busy = false;
          const errorMessage = this.baseService.processResponseError(error);
          let errorData: any;

          try {
            errorData = JSON.parse(errorMessage);
          } catch (e) {
            errorData = errorMessage ?? 'Operation failed. Please try again later.';
          }
          this.uiService.openDialog(MoviePublishAlertModalComponent, this.isMobile, {
            errorData,
            movieId: this.createdMovie.id
          });
        }
      );
    } else {
      this.uiService.openSnotify('Movie is already published.', 'Prompt', 'info');
    }
  }

  visibilityChange(movie: MatRadioChange): void {
    this.formPayload.visibility = this.selectVisibilityLevel(movie.value);
  }

  publishOptionChange(movie: MatRadioChange): void {
    this.formPayload.schedule = this.selectPublishOption(movie.value);
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
