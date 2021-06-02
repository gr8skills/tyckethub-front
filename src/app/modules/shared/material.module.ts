import {NgModule} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatMenuModule} from '@angular/material/menu';
import {MatOptionModule, MatRippleModule} from '@angular/material/core';
import {MatBadgeModule} from '@angular/material/badge';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatListModule} from '@angular/material/list';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import {MatToolbarModule} from '@angular/material/toolbar';
import {HeaderSearchBarComponent} from './components/header-search-bar/header-search-bar.component';
import {MaterialCardElevationDirective} from './core/material-card-elevation.directive';
import {FooterComponent} from './components/footer/footer.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {HeaderComponent} from './components/header/header.component';
import {SearchBoxComponent} from './components/search-box/search-box.component';
import {MovieSearchBoxComponent} from '../movie/components/movie-search-box/movie-search-box.component';
import {MovieCardComponent} from '../movie/components/movie-card/movie-card.component';
import {FlightSearchBoxComponent} from '../flight/components/flight-search-box/flight-search-box.component';
import {FlightCardComponent} from '../flight/components/flight-card/flight-card.component';
import {EventCardComponent} from '../event/components/event-card/event-card.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatGridListModule} from '@angular/material/grid-list';
import {MoreButtonComponent} from './components/more-button/more-button.component';
import {CovidAlertBarComponent} from './components/covid-alert-bar/covid-alert-bar.component';
import {MoviePageHeaderComponent} from '../movie/components/movie-page-header/movie-page-header.component';
import {MatCarouselModule} from '@ngbmodule/material-carousel';
import {AvatarComponent} from '../user/components/avatar/avatar.component';
import {OverviewCardComponent} from '../ticket/components/overview-card/overview-card.component';
import {PasswordModalComponent} from '../user/components/password-modal/password-modal.component';
import {TicketPageHeaderComponent} from '../ticket/components/ticket-page-header/ticket-page-header.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {ScrollTopComponent} from './components/scroll-top/scroll-top.component';
import {SidenavComponent} from './components/sidenav/sidenav.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {IgxCarouselModule, IgxSliderModule} from 'igniteui-angular';
import {MobileSearchBoxComponent} from './components/mobile-search-box/mobile-search-box.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatChipsModule} from '@angular/material/chips';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LazyloadDirective} from './core/lazyload.directive';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {ImageUploadComponent} from './components/image-upload/image-upload.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {ImageUploadWidgetComponent} from './components/image-upload-widget/image-upload-widget.component';
import {OnlineEventLinkFormComponent} from './components/online-event-link-form/online-event-link-form.component';
import {CapitalizePipe} from './core/capitalize.pipe';
import {MatTooltipModule} from '@angular/material/tooltip';
import { EventTicketFormComponent } from './components/event-ticket-form/event-ticket-form.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDividerModule} from '@angular/material/divider';
import {MatRadioModule} from '@angular/material/radio';
import { TicketSettingModalComponent } from './components/ticket-setting-modal/ticket-setting-modal.component';
import { SellTicketModalComponent } from './components/sell-ticket-modal/sell-ticket-modal.component';
import { ArtisteCardComponent } from './components/artiste-card/artiste-card.component';
import { CheckoutModalComponent } from './components/checkout-modal/checkout-modal.component';
import {LaddaModule} from 'angular2-ladda';
import { SummaryPipe } from './core/summary.pipe';
import { EventPublishAlertModalComponent } from './components/event-publish-alert-modal/event-publish-alert-modal.component';
import { TimeFormatPipe } from './core/time-format.pipe';
import {Angular4PaystackModule} from 'angular4-paystack';
import { EventStatusFormComponent } from './components/event-status-form/event-status-form.component';
import { DeleteModalComponent } from './components/delete-modal/delete-modal.component';
import { ArtisteCreationFormComponent } from './components/artiste-creation-form/artiste-creation-form.component';
import { HomepageMainSlideComponent } from './components/homepage-main-slide/homepage-main-slide.component';


@NgModule({
    exports: [
        MatFormFieldModule,
        MatAutocompleteModule,
        MatOptionModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatBadgeModule,
        MatMenuModule,
        MatCardModule,
        MatListModule,
        MatSelectModule,
        MatRippleModule,
        MatTableModule,
        MatCheckboxModule,
        MatDialogModule,
        MatToolbarModule,
        MaterialCardElevationDirective,
        FooterComponent,
        HeaderSearchBarComponent,
        HeaderComponent,
        SearchBoxComponent,
        MovieSearchBoxComponent,
        MovieCardComponent,
        FlexLayoutModule,
        FlightSearchBoxComponent,
        FlightCardComponent,
        EventCardComponent,
        CommonModule,
        MatTabsModule,
        MatGridListModule,
        MoreButtonComponent,
        CovidAlertBarComponent,
        MoviePageHeaderComponent,
        AvatarComponent,
        OverviewCardComponent,
        PasswordModalComponent,
        TicketPageHeaderComponent,
        MatSnackBarModule,
        HttpClientModule,
        MatSidenavModule,
        SidenavComponent,
        IgxCarouselModule,
        IgxSliderModule,
        MobileSearchBoxComponent,
        MatDatepickerModule,
        MatChipsModule,
        FormsModule,
        ImageUploadComponent,
        MatSlideToggleModule,
        OnlineEventLinkFormComponent,
        ImageUploadWidgetComponent,
        MatTooltipModule,
        MatExpansionModule,
        EventTicketFormComponent,
        MatDividerModule,
        MatRadioModule,
        ArtisteCardComponent,
        CapitalizePipe,
        SummaryPipe,
        TimeFormatPipe,
        EventStatusFormComponent,
        ArtisteCreationFormComponent,
        HomepageMainSlideComponent,
    ],
    imports: [
        FlexLayoutModule,
        RouterModule,
        CommonModule,
        MatListModule,
        MatIconModule,
        MatOptionModule,
        MatSelectModule,
        MatMenuModule,
        MatToolbarModule,
        HttpClientModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatBadgeModule,
        MatRippleModule,
        MatTableModule,
        MatCheckboxModule,
        MatDialogModule,
        MatTabsModule,
        MatGridListModule,
        MatCarouselModule,
        MatSlideToggleModule,
        MatTooltipModule,
        MatExpansionModule,
        MatDividerModule,
        MatRadioModule,
        MatDatepickerModule,
        FormsModule,
        LaddaModule,
        ReactiveFormsModule,
        Angular4PaystackModule,
    ],
  declarations: [
    HeaderSearchBarComponent,
    MaterialCardElevationDirective,
    FooterComponent,
    HeaderComponent,
    SearchBoxComponent,
    MovieSearchBoxComponent,
    MovieCardComponent,
    FlightSearchBoxComponent,
    FlightCardComponent,
    EventCardComponent,
    MoreButtonComponent,
    CovidAlertBarComponent,
    MoviePageHeaderComponent,
    AvatarComponent,
    OverviewCardComponent,
    PasswordModalComponent,
    TicketPageHeaderComponent,
    ScrollTopComponent,
    SidenavComponent,
    MobileSearchBoxComponent,
    LazyloadDirective,
    NotFoundComponent,
    ImageUploadComponent,
    ImageUploadWidgetComponent,
    OnlineEventLinkFormComponent,
    CapitalizePipe,
    EventTicketFormComponent,
    TicketSettingModalComponent,
    SellTicketModalComponent,
    ArtisteCardComponent,
    CheckoutModalComponent,
    SummaryPipe,
    EventPublishAlertModalComponent,
    TimeFormatPipe,
    EventStatusFormComponent,
    DeleteModalComponent,
    ArtisteCreationFormComponent,
    HomepageMainSlideComponent,
  ]
})

export class MaterialModule {
}
