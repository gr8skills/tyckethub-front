import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, Subscription} from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MovieFacadeService} from '../../facades/movie-facade.service';
import {LayoutService} from '../../../shared/facades/layout.service';
import {MovieDto, RawMovieFormValue} from '../../models/movie-dto';
import {AuthenticationService} from '../../../shared/facades/authentication.service';
import {BaseService} from '../../../shared/facades/base.service';
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from '@angular/router';
import {UiService} from '../../../shared/core/ui.service';
import {LocalStorageItems} from '../../../shared/models/enums';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss']
})
export class BasicInfoComponent implements OnInit, OnDestroy {

  createdMovie: any = this.route.snapshot.data.event.data;
  layoutSub = new Subscription();
  movieCreationProgressSub = new Subscription();
  countryStatesSubject = new BehaviorSubject<any>({});
  countryStates$ = this.countryStatesSubject.asObservable();
  currentUser = this.authService.currentUserValue;
  loaderSub = new Subscription();
  movieGenres: any;
  ageRestrictions: any;
  artistes: any;
  countries: any;
  countryStates: any;
  formErrorSubject = new BehaviorSubject<boolean>(false);
  formHasError = this.formErrorSubject.asObservable();
  selectedMovieTags: string[] = [...this.extractMovieTagNames(this.createdMovie?.tags)];
  separatorKeyCode: number[] = [ENTER, COMMA];
  selectable = true;
  removable = true;
  addOnBlur = true;
  isLoading = false;
  locationVenueButtons = {
    live: this.prepareMovieLocationPayload(this.createdMovie?.location)?.platform === 1,
    online: this.prepareMovieLocationPayload(this.createdMovie?.location)?.platform === 2,
    tobeAnnounced: this.prepareMovieLocationPayload(this.createdMovie?.location)?.platform === 3,
  };
  movieInfoForm = new FormGroup({
    title: new FormControl(this.createdMovie.name, [Validators.required]),
    description: new FormControl(this.createdMovie.description, [
      Validators.required,
      Validators.minLength(10)
    ]),
    organizer: new FormControl(!this.createdMovie.organizer ? this.currentUser.name : this.createdMovie.organizer,
      [Validators.required]),
    genre: new FormControl(this.extractMovieGenreIds(this.createdMovie.genres), [Validators.required]),
    ageRestriction: new FormControl(),
    // artistes: new FormControl(this.extractMovieArtisteIds(this.createdMovie.artistes), [Validators.required]),
    // tags: new FormControl(),
    location: new FormGroup({
      address: new FormControl(this.prepareMovieLocationPayload(this.createdMovie?.location)?.address, [Validators.required]),
      city: new FormControl(this.prepareMovieLocationPayload(this.createdMovie?.location)?.city, [Validators.required]),
      state: new FormControl(this.prepareMovieLocationPayload(this.createdMovie?.location)?.state, [Validators.required]),
      country: new FormControl(this.prepareMovieLocationPayload(this.createdMovie?.location)?.country, [Validators.required]),
    }),
  });

  controls = {
    title: this.movieInfoForm.controls.title,
    description: this.movieInfoForm.controls.description,
    genre: this.movieInfoForm.controls.genre,
    ageRestriction: this.movieInfoForm.controls.ageRestriction,
    tags: this.movieInfoForm.controls.tags,
    artistes: this.movieInfoForm.controls.artistes,
    address: this.movieInfoForm.get('location.address'),
    city: this.movieInfoForm.get('location.city'),
    state: this.movieInfoForm.get('location.state'),
    country: this.movieInfoForm.get('location.country'),
  };

  onMobile = false;

  constructor(private movieFacade: MovieFacadeService,
              private layoutService: LayoutService,
              private authService: AuthenticationService,
              private baseService: BaseService,
              private router: Router,
              private uiService: UiService,
              private route: ActivatedRoute) {
    this.movieFacade.genres$.subscribe(
      movieCats => {
        this.movieGenres = movieCats.data;
        console.log('Movie Genres: ', this.movieGenres);
      },
      error => {
      }
    );
    this.movieFacade.restrictions$.subscribe(
      ageRestrictions => {
        this.ageRestrictions = ageRestrictions.data;
        console.log('Age Limits: ', this.ageRestrictions);
      },
      error => {
      }
    );
    this.movieFacade.artistes$.subscribe(
      artistesData => {
        this.artistes = artistesData.data;
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

  ngOnInit(): void {
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
    this.movieFacade.getCountryStates(id).subscribe(states => {
      this.countryStatesSubject.next(states);
    });
  }

  addEventTags(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.selectedMovieTags.push(value);
    }

    if (input) {
      input.value = '';
    }
  }

  removeEventTag(tag: string): void {
    const index = this.selectedMovieTags.indexOf(tag);

    if (index >= 0) {
      this.selectedMovieTags.splice(index, 1);
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

  updateMovie(): void {
    if (this.createdMovie.is_completed !== 1) {


      this.movieInfoForm.value.tags = this.selectedMovieTags;
      this.movieInfoForm.value.id = this.createdMovie.id;
      this.movieInfoForm.value.location.platform = this.selectedPlatform();
      this.movieInfoForm.value.userId = this.authService.currentUserValue.id;
      this.movieInfoForm.value.statusId = 1;
      this.movieInfoForm.value.orgnizer = this.authService.currentUserValue.name;

      if (this.movieInfoForm.valid) {
        const movie = new MovieDto(this.movieInfoForm.value as RawMovieFormValue);
        console.log('MOVIE Update PAYLOAD => ', movie);
        this.uiService.busy = true;
        this.movieFacade.updateMovie(movie).subscribe(
          createdMovie => {
            this.uiService.busy = false;
            console.log('CREATED-MOVIE: ', createdMovie);
            this.baseService.storeLocalItem(LocalStorageItems.CREATED_MOVIE, JSON.stringify(createdMovie));
            this.router.navigateByUrl(`/movies/${this.createdMovie.id}/edit/details`);
          }, error => {
            this.uiService.busy = false;
            const errorMessage = this.baseService.processResponseError(error);
            console.log('Error msg ', errorMessage);
            this.uiService.openSnotify(errorMessage, 'Prompt', 'info');
            if (errorMessage.toLowerCase() === 'no change was made to the movie details') {
              setTimeout(() => {
                this.router.navigateByUrl(`/movies/${this.createdMovie.id}/edit/details`);
              }, 5200);
            }
          });
      } else {
        this.formErrorSubject.next(true);
        console.log('FORM-ERROR => ', this.movieInfoForm);
        this.uiService.busy = false;
      }
    } else {
      this.router.navigateByUrl(`/movies/${this.createdMovie.id}/edit/details`);
    }
  }

  private extractMovieGenreIds(genres: any[]): number[] {
    const genIds: number[] = [];
    genres.forEach(gen => {
      genIds.push(gen.id);
    });
    return genIds;
  }

  private extractMovieTagNames(tags: any[]): string[] {
    const tagNames: string[] = [];
    if (tags) {
      tags.forEach(tag => {
        tagNames.push(tag.name);
      });
    }
    return tagNames;
  }

  private extractMovieArtisteIds(artistes: any[]): number[] {
    const artisteIds: number[] = [];
    artistes.forEach(artiste => {
      artisteIds.push(artiste.id);
    });
    return artisteIds;
  }

  private prepareMovieLocationPayload(location: any): any {
    return {
      address: location.venue_address,
      city: location.city_name,
      country: location.country_id,
      state: location.state_id,
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
    this.movieCreationProgressSub.unsubscribe();
    this.loaderSub.unsubscribe();
  }

}
