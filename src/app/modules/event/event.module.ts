import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { EventComponent } from './components/event/event.component';
import { MaterialModule } from '../shared/material.module';
import {MatCarouselModule} from '@ngbmodule/material-carousel';
import { CreateEventComponent } from './components/create-event/create-event.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {AuthGuard} from '../shared/facades/auth-guard';
import { CompleteEventComponent } from './components/complete-event/complete-event.component';
import {LaddaModule} from 'angular2-ladda';
import { EditEventComponent } from './components/edit-event/edit-event.component';
import {OrganizerGuard} from '../user/facades/organizer-guard';
import { BasicInfoComponent } from './components/basic-info/basic-info.component';
import { DetailsComponent } from './components/details/details.component';
import { OnlineEventComponent } from './components/online-event/online-event.component';
import { EditEventTicketsComponent } from './components/edit-event-tickets/edit-event-tickets.component';
import { PublishComponent } from './components/publish/publish.component';
import { EventDashboardComponent } from './components/event-dashboard/event-dashboard.component';
import { EventDescriptionComponent } from './components/event-description/event-description.component';
import {SlickCarouselModule} from 'ngx-slick-carousel';
import {EventResolver} from './core/event.resolver';
import {EventParentResolver} from './core/event-parent.resolver';

const routes: Routes = [
  {
    path: '',
    component: EventComponent
  },
  {
    path: 'create',
    component: CreateEventComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':id/edit',
    component: EditEventComponent,
    canActivate: [AuthGuard, OrganizerGuard],
    resolve: {event: EventParentResolver},
    children: [
      {
        path: '',
        redirectTo: 'basic-info',
        pathMatch: 'full'
      },
      {
        path: 'basic-info',
        component: BasicInfoComponent,
        resolve: {event: EventResolver},
      },
      {
        path: 'details',
        component: DetailsComponent,
        resolve: {event: EventResolver},
      },
      {
        path: 'online-event',
        component: OnlineEventComponent,
        resolve: {event: EventResolver},
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
  {
    path: 'complete',
    component: CompleteEventComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':id/description',
    component: EventDescriptionComponent,
    resolve: {event: EventParentResolver},
  }
];

@NgModule({
  imports: [
    MaterialModule,
    RouterModule.forChild(routes),
    MatCarouselModule,
    ReactiveFormsModule,
    NgxMaterialTimepickerModule,
    LaddaModule,
    SlickCarouselModule
  ],
  declarations: [
    EventComponent,
    CreateEventComponent,
    CompleteEventComponent,
    EditEventComponent,
    BasicInfoComponent,
    DetailsComponent,
    OnlineEventComponent,
    EditEventTicketsComponent,
    PublishComponent,
    EventDashboardComponent,
    EventDescriptionComponent,
  ],
  exports: [
  ],
  providers: [
    EventResolver,
  ],
})

export class EventModule {

}
