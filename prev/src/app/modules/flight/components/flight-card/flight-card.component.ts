import {Component, Input, OnInit} from '@angular/core';
import {Flight} from '../../models/flight.model';

@Component({
  selector: 'app-flight-card',
  templateUrl: './flight-card.component.html',
  styleUrls: ['./flight-card.component.scss']
})
export class FlightCardComponent implements OnInit {

  @Input('flight') flight: Flight;

  constructor() {
    this.flight = new Flight();
  }

  ngOnInit(): void {
  }

}
