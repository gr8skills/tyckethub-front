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
import {MovieParentResolver} from './core/movie-parent.resolver';
import { BasicInfoComponent } from './components/basic-info/basic-info.component';
import {MovieResolver} from './core/movie.resolver';
import { DetailsComponent } from './components/details/details.component';
import { OnlineMovieComponent } from './components/online-movie/online-movie.component';
import { OnlineMovieLinkFormComponent } from './components/online-movie-link-form/online-movie-link-form.component';
import { EditMovieTicketsComponent } from './components/edit-movie-tickets/edit-movie-tickets.component';
import { PublishComponent } from './components/publish/publish.component';
import { MovieDashboardComponent } from './components/movie-dashboard/movie-dashboard.component';
import { CompleteMovieComponent } from './components/complete-movie/complete-movie.component';
import { MovieDescriptionComponent } from './components/movie-description/movie-description.component';

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
        component: OnlineMovieComponent,
        resolve: {event: MovieResolver},
      },
      {
        path: 'tickets',
        component: EditMovieTicketsComponent,
        resolve: {event: MovieResolver},
      },
      {
        path: 'publish',
        component: PublishComponent,
        resolve: {event: MovieResolver},
      },
      {
        path: 'dashboard',
        component: MovieDashboardComponent,
        resolve: {event: MovieResolver},
      }
    ]
  },
  {
    path: 'complete',
    component: CompleteMovieComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':id/description',
    component: MovieDescriptionComponent,
    resolve: {event: MovieParentResolver},
  }
];

@NgModule({
  declarations: [
    MovieIndexComponent,
    MovieComparisonDetailComponent,
    CreateMovieComponent,
    EditMovieComponent,
    BasicInfoComponent,
    DetailsComponent,
    OnlineMovieComponent,
    OnlineMovieLinkFormComponent,
    EditMovieTicketsComponent,
    PublishComponent,
    MovieDashboardComponent,
    CompleteMovieComponent,
    MovieDescriptionComponent,
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
