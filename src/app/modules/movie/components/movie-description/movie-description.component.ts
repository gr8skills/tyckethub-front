import {Component, OnInit} from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseService} from '../../../shared/facades/base.service';
import {UiService} from '../../../shared/core/ui.service';
import {LayoutService} from '../../../shared/facades/layout.service';
import {Subscription} from 'rxjs';
import {AuthenticationService} from '../../../shared/facades/authentication.service';
import {CheckoutModalComponent} from '../../../shared/components/checkout-modal/checkout-modal.component';
import {environment} from '../../../../../environments/environment';
import {EventTicket, MovieTicket} from '../../../shared/models/custom-types';
import {LocalStorageItems} from '../../../shared/models/enums';
import {stringify} from 'querystring';
import {MovieFacadeService} from '../../facades/movie-facade.service';
import {map} from 'rxjs/operators';
import {Movie} from '../../models/movie.model';
import {Event} from '../../../event/models/event.model';

@Component({
  selector: 'app-movie-description',
  templateUrl: './movie-description.component.html',
  styleUrls: ['./movie-description.component.scss']
})
export class MovieDescriptionComponent implements OnInit {

  readonly backendPath = environment.backendPath;
  createdMovie = this.route.snapshot.data.movie.data;
  createdMovieImages = this.baseService.processMovieImages(this.createdMovie.images);
  movieStartTime = this.baseService.convertTimeToAMPMFormat(this.createdMovie.start_time);
  movieTickets: MovieTicket[] = this.baseService.processMovieTickets(this.createdMovie.tickets);
  canCheckOut = false;
  ticketsCount: any;
  layoutSub = new Subscription();
  displayStyle = {};
  isFavorite = false;
  favColor: ThemePalette = 'accent';
  isMobile = false;
  inputValue: any;
  movieId = 21;

  slickSlideConfig = {
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000
  };
  artistes = [
    {image: 'assets/images/img_127-sm.png', name: 'Burna Boy'},
    {image: 'assets/images/img_128-sm.png', name: 'Tiwa Madness'},
    {image: 'assets/images/img_129-sm.png', name: 'Falz'}
  ];

  similarMovies$ = this.movieFacadeService.getSimilarMovies(this.movieId)
    .pipe(
      map(response => {
        console.log('Similar Movies: ', response);
        const moviesArray = response as Array<any>;
        const moviesAbridgedArray: Movie[] = [];

        moviesArray.forEach(movieAbridged => {
          moviesAbridgedArray.push(Movie.fromJSON(movieAbridged));
        });
        return moviesAbridgedArray;
      })
    );
  constructor(private router: Router,
              private route: ActivatedRoute,
              private baseService: BaseService,
              private uiService: UiService,
              private layoutService: LayoutService,
              private authService: AuthenticationService,
              private movieFacadeService: MovieFacadeService) { }

  ngOnInit(): void {
    this.layoutSub = this.layoutService.handsetLayout$.subscribe(x => this.isMobile = x.matches);
    this.ticketsCount = this.initializeTicketsCount();
    this.canCheckOut = this.canCheckout();
  }

  initializeTicketsCount(): any {
    const availableTickets = {};
    this.movieTickets.forEach(ticket => {
      // @ts-ignore
      availableTickets[ticket.title] = 0;
    });

    return availableTickets;
  }

  checkValueLimit(inputElement: HTMLInputElement): boolean {
    this.inputValue = inputElement;
    if (!inputElement.value) {
      inputElement.value = String(1);
    }
    const maxInput = parseInt(inputElement.max);
    const currInput = parseInt(inputElement.value);
    if (currInput > maxInput) {
      this.uiService.openSnotify(`Maximum buyable ticket(s) per user (${maxInput}) exceeded`  , 'Attention', 'warning');
      inputElement.value = inputElement.max;
      return false;
    }else {
      return true;
    }
  }

  canCheckout(): boolean {
    let accmTickets = 0;
    for (const [prop, val] of Object.entries(this.ticketsCount)) {
      const intVal = val as number;
      if (intVal > 0) {
        accmTickets += intVal;
      }
    }
    return accmTickets > 0;
  }

  prepareTicketsForCheckout(): any[] {
    const ticketArray: any[] = [];
    const selectedTicket: any[] = [];

    for (const [prop, val] of Object.entries(this.ticketsCount)) {
      const intVal = val as number;
      if (intVal > 0) {
        selectedTicket.push({title: prop, count: intVal});
      }
    }

    if (selectedTicket.length > 0) {
      this.movieTickets.forEach(ticket => {
        const foundTicket: { title: string, count: number } = selectedTicket.find(selTicket =>
          selTicket.title.toLowerCase() === ticket.title.toLowerCase());
        if (foundTicket) {
          ticketArray.push({
            title: ticket.title,
            quantity: foundTicket.count,
            price: ticket.price,
            id: +ticket.id
          });
        }
      });
    }

    return ticketArray;
  }

  toggleSearchBox(toggleState: boolean): void {
    //
  }

  navigateToHome(): void {
    this.router.navigateByUrl('/');
  }

  navigateToArtistesPage(): void {
    this.baseService.navigateToArtistesPage();
  }

  navigateToArtistePage(artisteId: any): void {
    this.router.navigateByUrl(`/tickets/artistes/${artisteId}`);
  }

  toggleFavorite(): void {
    const favThemeColors = {
      warning: 'warn' as ThemePalette,
      accent: 'accent' as ThemePalette
    };
    this.isFavorite = !this.isFavorite;
    this.favColor = this.isFavorite ? favThemeColors.warning : favThemeColors.accent;
  }

  openCheckoutModal(): void {
    if (!this.authService.loggedIn()) {
      this.baseService.storeLocalItem(LocalStorageItems.RETURN_URL, this.router.url);
      console.log(JSON.stringify(this.router.url));
      this.router.navigateByUrl('/login');
      return;
    }

    if (!this.canCheckout()) {
      this.uiService.openSnotify('Please choose the quantity of ticket(s) you wish to buy', 'Attention', 'warning');
      return;
    }
    // tslint:disable-next-line:prefer-const
    let ticketQuantity = this.inputValue;
    if (!this.checkValueLimit(ticketQuantity)) {
      return;
    }
    const data = {
        user: this.authService.currentUserValue,
        ticketData: this.prepareTicketsForCheckout(),
        movieData: this.createdMovie,
      }
    ;
    const dialogRef = this.uiService.openCheckOutDialog(CheckoutModalComponent, this.isMobile, data);
  }
}
