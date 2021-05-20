import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {EventFacadeService} from '../../facades/event-facade.service';

@Component({
  selector: 'app-complete-event',
  templateUrl: './complete-event.component.html',
  styleUrls: ['./complete-event.component.scss']
})
export class CompleteEventComponent implements OnInit {

  readonly endPoint = environment.apiBaseUrl;
  url = '';
  processCompleted = false;

  constructor(private eventFacade: EventFacadeService) { }

  ngOnInit(): void {
    const createdEvent = JSON.parse(localStorage.getItem('createdEvent') as string);
    const eventId = createdEvent.id;
    this.url = `${this.endPoint}/events/${eventId}/images`;
    this.eventFacade.eventCreationComplete$.subscribe(x => this.processCompleted = x);
  }

  // TODO: Check progress and notify the event organizer

}
