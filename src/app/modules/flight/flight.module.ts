import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { FlightComponent } from './components/flight/flight.component';
import { MaterialModule } from '../shared/material.module';
import { MatCarouselModule } from '@ngbmodule/material-carousel';
import { FlightListComponent } from './components/flight-list/flight-list.component';
import { FlightComparisonDetailComponent } from './components/flight-comparison-detail/flight-comparison-detail.component';
import { LightboxModule } from 'ngx-lightbox';
import {BarRatingModule} from 'ngx-bar-rating';
import { FlightSearchBoxMobileComponent } from './components/flight-search-box-mobile/flight-search-box-mobile.component';

const routes: Routes = [
  {
    path: '',
    component: FlightComponent,
    children: [

    ]
  },
  {
    path: 'list',
    component: FlightListComponent,
  },
  {
    path: ':id/detail',
    component: FlightComparisonDetailComponent
  }
];

@NgModule({
  declarations: [
    FlightComponent,
    FlightListComponent,
    FlightComparisonDetailComponent,
    FlightSearchBoxMobileComponent,
  ],
  exports: [ ],
  imports: [
    RouterModule.forChild(routes),
    MaterialModule,
    MatCarouselModule,
    LightboxModule,
    BarRatingModule,
  ]
})

export class FlightModule {}
