import {Component, OnDestroy, OnInit} from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {AuthenticationService} from '../../../shared/facades/authentication.service';
import {BaseService} from '../../../shared/facades/base.service';
import {UiService} from '../../../shared/core/ui.service';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {LayoutService} from '../../../shared/facades/layout.service';
import {MovieService} from '../../apis/movie.service';
import {MovieFacadeService} from '../../facades/movie-facade.service';
import {MovieDto, RawMovieFormValue} from '../../models/movie-dto';
import {AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {MatChipInputEvent} from '@angular/material/chips';
import {MatCheckboxChange} from '@angular/material/checkbox';
import {LocalStorageItems} from '../../../shared/models/enums';
import {map} from 'rxjs/operators';


@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.scss']
})
export class CreateMovieComponent implements OnInit, OnDestroy {
  private readonly baseUrl = environment.apiBaseUrl;
  layoutSub = new Subscription();
  movieCreationProgressSub = new Subscription();
  countryStatesSubject = new BehaviorSubject<any>({});
  countryStates$ = this.countryStatesSubject.asObservable();
  loaderSub = new Subscription();
  movieGenres: any;
  movieAgeRestrictions: any;
  countries: any;
  artistes: any;
  countryStates: any;
  formErrorSubject = new BehaviorSubject<boolean>(false);
  formHasError = this.formErrorSubject.asObservable();
  selectedMovieTags: string[] = [];
  separatorKeyCode: number[] = [ENTER, COMMA];
  selectable = true;
  removable = true;
  addOnBlur = true;
  isLoading = false;
  currentUser = this.authService.currentUserValue;
  locationVenueButtons = {
    cinema: true,
    online: false,
    tobeAnnounced: false
  };
  form = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [
      Validators.required,
      Validators.minLength(10)
    ]),
    genre: new FormControl(null, [Validators.required]),
    // artistes: new FormControl(''),
    ageRestriction: new FormControl(null),
    // tags: new FormControl(),
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
    genre: this.form.controls.genre,
    ageRestriction: this.form.controls.ageRestriction,
    // tags: this.form.controls.tags,
    // artistes: this.form.controls.artistes,
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
              private authService: AuthenticationService,
              private baseService: BaseService,
              private uiService: UiService,
              private movieService: MovieService,
              private movieFacade: MovieFacadeService) {
    this.movieFacade.genres$.subscribe(
      movieGens => {
        this.movieGenres = movieGens.data;
      },
      error => {
      }
    );

    this.movieFacade.restrictions$.subscribe(
      movieRestrictions => {
        this.movieAgeRestrictions = movieRestrictions.data;
      },
      error => {
      }
    );

    this.movieFacade.artistes$.subscribe(
      artisteData => {
        this.artistes = artisteData.data;
      },
      error => {
      }
    );

    this.movieFacade.countries$.subscribe(
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

  private async init(): Promise<void> {
    this.movieCreationProgressSub = await this.movieFacade.getOrganizerUncompletedMovies(this.currentUser.id).subscribe(
      response => {
        const movies: any [] = response.data;
        if (movies.length > 0) {
          console.log('Movie Id', movies[0].id);
          this.router.navigate(['/movies', +movies[0].id, 'edit', 'details']);
        }
      },
      error => {
        console.log(error);
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

  addMovieTags(movie: MatChipInputEvent): void {
    const input = movie.input;
    const value = movie.value;

    if ((value || '').trim()) {
      this.selectedMovieTags.push(value);
    }

    if (input) {
      input.value = '';
    }
  }

  removeMovieTag(tag: string): void {
    const index = this.selectedMovieTags.indexOf(tag);

    if (index >= 0) {
      this.selectedMovieTags.splice(index, 1);
    }
  }

  fetchStates(countryId: number): void {
    this.movieFacade.getCountryStates(countryId).subscribe(states => {
      this.countryStatesSubject.next(states);
    });
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

  createMovie(): void {
    this.form.value.tags = this.selectedMovieTags;

    this.form.value.location.platform = this.selectedPlatform();
    this.form.value.userId = this.authService.currentUserValue.id;
    this.form.value.statusId = 1;
    this.form.value.startTime = this.baseService.convertInputTimeString(this.form.value.startTime);
    this.form.value.endTime = this.baseService.convertInputTimeString(this.form.value.endTime);

    if (this.form.valid) {
      const event = new MovieDto(this.form.value as RawMovieFormValue);
      console.log('MOVIE PAYLOAD => ', event);
      this.uiService.busy = true;
      this.movieFacade.createMovie(event).subscribe(
        createdMovie => {
          this.uiService.busy = false;
          console.log('CREATED-MOVIE: ', createdMovie);
          this.baseService.storeLocalItem(LocalStorageItems.CREATED_MOVIE, JSON.stringify(createdMovie.data));
          this.router.navigate(['/movies', createdMovie.data.id, 'edit', 'details']).then();
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

  onCancel(): void {
    this.router.navigate(['/movies']).then(x => x);
  }

  checkMovieTitleExists(title: string): Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.baseUrl}/exists/movies/${title}`);
  }

  movieTitleValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.checkMovieTitleExists(control.value).pipe(
        map(resp => {
          return resp ? {movieTitleExists: true} : null;
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
    this.movieCreationProgressSub.unsubscribe();
    this.layoutSub.unsubscribe();
    this.loaderSub.unsubscribe();
  }

}
