import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, Subject, Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {LayoutService} from '../../../shared/facades/layout.service';
import {MovieFacadeService} from '../../facades/movie-facade.service';
import {AuthenticationService} from '../../../shared/facades/authentication.service';
import {BaseService} from '../../../shared/facades/base.service';
import {UiService} from '../../../shared/core/ui.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {EventImageTypes, MovieImageTypes} from '../../../shared/models/enums';
import {environment} from '../../../../../environments/environment';
import {startWith} from 'rxjs/operators';
import {MovieDto, RawMovieFormValue} from '../../models/movie-dto';
import {MovieUploadedImages} from '../../../shared/models/custom-types';

interface MovieImage {
  thumb: boolean;
}

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {
  private endPoint = environment.apiBaseUrl;
  readonly backendPath = environment.backendPath;
  createdMovie: any = this.route.snapshot.data.event.data;
  createdMovieImages: MovieUploadedImages = this.baseService.processEventImages(this.createdMovie.images);
  isLoading = false;
  fileNames = {
    thumb: '',
  };
  formErrorSubject = new BehaviorSubject<boolean>(false);
  formHasError$ = this.formErrorSubject.asObservable();
  loaderSub = new Subscription();
  layoutSub = new Subscription();
  movieCreationProgressSub = new Subscription();
  onMobile = false;
  uploadedImageSubject = new Subject<MovieImage>();
  uploadedImages$ = this.uploadedImageSubject.asObservable().pipe(
    startWith({thumb: false})
  );

  movieDetailForm = new FormGroup({
    thumb: new FormControl(null, [Validators.required]),
  });

  controls = {
    thumb: this.movieDetailForm.controls.thumb,
  };


  constructor(private router: Router,
              private layoutService: LayoutService,
              private movieFacade: MovieFacadeService,
              private authService: AuthenticationService,
              private baseService: BaseService,
              private uiService: UiService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    console.log('Created Movie image', this.createdMovieImages);
    console.log('!this.createdEventImages.thumb ', !this.createdMovieImages.thumb);
    this.layoutService.handsetLayout$.subscribe(
      x => this.onMobile = x.matches,
      error => console.log(error)
    );
  }

  refresh(): void {
    window.location.reload();
  }

  scrollTop(): void {
    const scrollToTop = window.setInterval(() => {
      const pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - 20); // how far to scroll on each step
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 16);
  }

  processFile(event: any, imageLabel: string): void {
    const imageFile: File = event.target.files[0];

    if (imageFile) {
      this.updateFileNamesLabel(imageLabel, imageFile.name);
      const formData = new FormData();
      formData.set(imageLabel, imageFile);
      this.uiService.busy = true;
      this.movieFacade.uploadMovieImages(formData, this.createdMovie.id).subscribe(
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
      this.onUpload();
    }
  }

  private updateFileNamesLabel(imageLabel: string, imageFileName: string): void {
    switch (imageLabel) {
      case EventImageTypes.BANNER:
        // this.fileNames.mobile = imageFileName;
        break;
      case EventImageTypes.COVER:
        this.fileNames.thumb = imageFileName;
    }
  }

  onCancel(): void {
    this.router.navigateByUrl('/movies');
  }

  onSubmit(): void {
    const path: string = this.createdMovie.location.platform === 2 ? 'online-movie' : 'tickets';
    this.router.navigateByUrl(`/movies/${this.createdMovie.id}/edit/${path}`);
  }

  onUpload(): void {
    const path2: string = this.createdMovie.location.platform === 1 ? 'details' : 'online-event';
    this.router.navigateByUrl('/movies').then(() => { this.router.navigateByUrl(`/movies/${this.createdMovie.id}/edit/${path2}`).then(r => `/events/${this.createdMovie.id}/edit/${path2}`); });
    // this.router.navigateByUrl(`/events/${this.createdEvent.id}/edit/${path2}`);
  }

  ngOnDestroy(): void {
    if (this.loaderSub) {
      this.loaderSub.unsubscribe();
    }
    if (this.layoutSub) {
      this.layoutSub.unsubscribe();
    }
    if (this.movieCreationProgressSub) {
      this.movieCreationProgressSub.unsubscribe();
    }
  }

}
