import {NgModule} from '@angular/core';
import {TicketComponent} from './components/ticket/ticket.component';
import {MaterialModule} from '../shared/material.module';
import {RouterModule, Routes} from '@angular/router';
import {OverviewComponent} from './components/overview/overview.component';
import {MyTicketsComponent} from './components/my-tickets/my-tickets.component';
import {SalesComponent} from './components/sales/sales.component';
import {PaymentsComponent} from './components/payments/payments.component';
import {FavoritesComponent} from './components/favorites/favorites.component';
import {RfIdComponent} from './components/rf-id/rf-id.component';
import {SettingsComponent} from './components/settings/settings.component';
import {AuthGuard} from '../shared/facades/auth-guard';
import {OrganizerOverviewComponent} from './components/organizer-overview/organizer-overview.component';
import {OrganizerEventComponent} from './components/organizer-event/organizer-event.component';
import {OrganizerTicketsComponent} from './components/organizer-tickets/organizer-tickets.component';
import {OrganizerInfoComponent} from './components/organizer-info/organizer-info.component';
import {OrganizerGuard} from '../user/facades/organizer-guard';
import {HowToSellComponent} from './components/how-to-sell/how-to-sell.component';
import {ArtistePageComponent} from './components/artiste-page/artiste-page.component';
import {ArtistePageHeaderComponent} from './components/artiste-page-header/artiste-page-header.component';
import {ArtisteEventsResolver} from '../user/core/artiste-events.resolver';
import {ArtisteResolver} from '../user/core/artiste.resolver';
import {SiteSettingsComponent} from './components/site-settings/site-settings.component';
import {DataTablesModule} from 'angular-datatables';
import { OrganizerMovieComponent } from './components/organizer-movie/organizer-movie.component';
import {MatPaginatorModule} from "@angular/material/paginator";

const routes: Routes = [
  {
    path: '',
    component: TicketComponent,
    children: [
      {
        path: 'overview',
        component: OverviewComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'my-tickets',
        component: MyTicketsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'sales',
        component: SalesComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'payments',
        component: PaymentsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'favorites',
        component: FavoritesComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'rf-id',
        component: RfIdComponent,
      },
      {
        path: 'settings',
        component: SettingsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'organizer/overview',
        component: OrganizerOverviewComponent,
        canActivate: [AuthGuard, OrganizerGuard]
      },
      {
        path: 'organizer/events',
        component: OrganizerEventComponent,
        canActivate: [AuthGuard, OrganizerGuard]
      },
      {
        path: 'organizer/movies',
        component: OrganizerMovieComponent,
        canActivate: [AuthGuard, OrganizerGuard]
      },
      {
        path: 'organizer/tickets',
        component: OrganizerTicketsComponent,
        canActivate: [AuthGuard, OrganizerGuard]
      },
      {
        path: 'organizer/info',
        component: OrganizerInfoComponent,
        canActivate: [AuthGuard, OrganizerGuard]
      },
      {
        path: 'site-settings',
        component: SiteSettingsComponent,
        canActivate: [AuthGuard]
      },
    ],
  },
  {
    path: 'artistes/:id',
    component: ArtistePageComponent,
    resolve: {
      events: ArtisteEventsResolver,
      artiste: ArtisteResolver
    }
  },
  {
    path: 'how-to-sell',
    component: HowToSellComponent
  }
];

@NgModule({
  declarations: [
    TicketComponent,
    OverviewComponent,
    MyTicketsComponent,
    SalesComponent,
    PaymentsComponent,
    FavoritesComponent,
    RfIdComponent,
    SettingsComponent,
    OrganizerOverviewComponent,
    OrganizerEventComponent,
    OrganizerTicketsComponent,
    OrganizerInfoComponent,
    SiteSettingsComponent,
    HowToSellComponent,
    ArtistePageComponent,
    ArtistePageHeaderComponent,
    OrganizerMovieComponent,
  ],
  exports: [],
    imports: [
        MaterialModule,
        RouterModule.forChild(routes),
        DataTablesModule,
        MatPaginatorModule,
    ]
})

export class TicketModule {
}
