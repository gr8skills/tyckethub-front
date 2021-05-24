import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MovieIndexComponent} from './components/movie-index/movie-index.component';
import {MaterialModule} from '../shared/material.module';
import {MatCarouselModule} from "@ngbmodule/material-carousel";
import { MovieComparisonDetailComponent } from './components/movie-comparison-detail/movie-comparison-detail.component';

const routes: Routes = [
  {
    path: '',
    component: MovieIndexComponent,
  }
];

@NgModule({
  declarations: [
    MovieIndexComponent,
    MovieComparisonDetailComponent,
  ],
  exports: [],
  imports: [
    MaterialModule,
    RouterModule.forChild(routes),
    MatCarouselModule,

  ]
})

export class MovieModule {}
