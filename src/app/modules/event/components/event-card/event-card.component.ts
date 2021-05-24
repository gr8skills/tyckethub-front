import {Component, Input, OnInit} from '@angular/core';
import {Event} from '../../models/event.model';
import {ThemePalette} from '@angular/material/core';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent implements OnInit {

  @Input('event') event: Event;
  @Input('isFavorite') isFavorite = false;

  readonly backendPath = environment.backendPath;
  favColor: ThemePalette = 'warn';

  constructor() {
    this.event = new Event();
  }

  ngOnInit(): void {
  }

  toggleFavorite(): void {
    console.log('this.favColor ', this.favColor);
    console.log('this.isFavorite ', this.isFavorite);
    this.isFavorite = !this.isFavorite;
  }

}
