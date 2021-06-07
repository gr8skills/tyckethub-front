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

const routes: Routes = [
  {
    path: '',
    component: MovieIndexComponent,
  },
  {
    path: 'create',
    component: CreateMovieComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [
    MovieIndexComponent,
    MovieComparisonDetailComponent,
    CreateMovieComponent,
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
