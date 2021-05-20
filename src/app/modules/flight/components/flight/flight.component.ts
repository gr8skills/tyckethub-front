import {Component, OnInit} from '@angular/core';
import {FLIGHTS, MORE_FLIGHTS} from '../../../shared/data';
import {Flight, FlightType} from '../../models/flight.model';
import {UiService} from "../../../shared/core/ui.service";

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.scss']
})
export class FlightComponent implements OnInit {

  carouselImages = [
    'assets/images/img_65.jpg',
    'assets/images/img_66.jpg',
    'assets/images/img_67.jpg'
  ];

  flights: Flight[] = [...FLIGHTS];
  moreFlights: Flight[] = [...MORE_FLIGHTS];
  specialFlight: Flight;
  additionalFlights: Flight[];
  displayStyle = {display: 'none'};

  constructor(private uiService: UiService) {
    this.specialFlight = this.moreFlights.find(f => f.id === 7) || new Flight();
    this.moreFlights = this.moreFlights.filter(f => f.type !== 'FEATURED');
    this.additionalFlights = [...this.moreFlights, ...this.flights];
  }

  ngOnInit(): void {
  }

  toggleSearchBox(toggleState: boolean): void {
    console.log('State => ', toggleState);
    if (toggleState) {
      this.displayStyle = {display: 'block'};
    } else {
      this.displayStyle = {display: 'none'};
    }
  }
}

