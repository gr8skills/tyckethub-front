import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MovieIndexComponent} from './components/movie-index/movie-index.component';
import {MaterialModule} from '../shared/material.module';
import {MatCarouselModule} from '@ngbmodule/material-carousel';
import { MovieComparisonDetailComponent } from './components/movie-comparison-detail/movie-comparison-detail.component';
import { CreateMovieComponent } from './components/create-movie/create-movie.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {LaddaModule} from 'angular2-ladda';
import {AuthGuard} from '../shared/facades/auth-guard';
import { EditMovieComponent } from './components/edit-movie/edit-movie.component';
import {OrganizerGuard} from '../user/facades/organizer-guard';
import {EventResolver} from '../event/core/event.resolver';
import {OnlineEventComponent} from '../event/components/online-event/online-event.component';
import {EditEventTicketsComponent} from '../event/components/edit-event-tickets/edit-event-tickets.component';
import {PublishComponent} from '../event/components/publish/publish.component';
import {EventDashboardComponent} from '../event/components/event-dashboard/event-dashboard.component';
import {MovieParentResolver} from './core/movie-parent.resolver';
import { BasicInfoComponent } from './components/basic-info/basic-info.component';
import {MovieResolver} from './core/movie.resolver';
import { DetailsComponent } from './components/details/details.component';

const routes: Routes = [
  {
    path: '',
    component: MovieIndexComponent,
  },
  {
    path: 'create',
    component: CreateMovieComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':id/edit',
    component: EditMovieComponent,
    canActivate: [AuthGuard, OrganizerGuard],
    resolve: {event: MovieParentResolver},
    children: [
      {
        path: '',
        redirectTo: 'basic-info',
        pathMatch: 'full'
      },
      {
        path: 'basic-info',
        component: BasicInfoComponent,
        resolve: {event: MovieResolver},
      },
      {
        path: 'details',
        component: DetailsComponent,
        resolve: {event: MovieResolver},
      },
      {
        path: 'online-movie',
        component: OnlineEventComponent,
        resolve: {event: MovieResolver},
      },
      {
        path: 'tickets',
        component: EditEventTicketsComponent,
        resolve: {event: EventResolver},
      },
      {
        path: 'publish',
        component: PublishComponent,
        resolve: {event: EventResolver},
      },
      {
        path: 'dashboard',
        component: EventDashboardComponent,
        resolve: {event: EventResolver},
      }
    ]
  },
];

@NgModule({
  declarations: [
    MovieIndexComponent,
    MovieComparisonDetailComponent,
    CreateMovieComponent,
    EditMovieComponent,
    BasicInfoComponent,
    DetailsComponent,
  ],
  exports: [],
  imports: [
    MaterialModule,
    RouterModule.forChild(routes),
    MatCarouselModule,
    ReactiveFormsModule,
    NgxMaterialTimepickerModule,
    LaddaModule,

  ]
})

export class MovieModule {}
