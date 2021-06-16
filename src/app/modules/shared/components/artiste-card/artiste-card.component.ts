import {Component, Input, NgModule, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterModule, Routes} from '@angular/router';
import {EventDescriptionComponent} from '../../../event/components/event-description/event-description.component';
import {EventParentResolver} from '../../../event/core/event-parent.resolver';

const routes: Routes = [
  {
    path: ':id/description',
    component: EventDescriptionComponent,
    resolve: {event: EventParentResolver},
  }
];



@Component({
  selector: 'app-artiste-card',
  templateUrl: './artiste-card.component.html',
  styleUrls: ['./artiste-card.component.scss'],
})
export class ArtisteCardComponent implements OnInit {
  @Input('artiste') artiste: any;
  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  whenClicked(id: any): void {
    this.router.navigateByUrl(`/events`).then(r => this.router.navigateByUrl(`/events/${id}/description`));
  }

}
