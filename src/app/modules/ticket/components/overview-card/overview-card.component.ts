import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-overview-card',
  templateUrl: './overview-card.component.html',
  styleUrls: ['./overview-card.component.scss']
})
export class OverviewCardComponent implements OnInit {

  @Input('showViewButton') displayViewButton = true;
  constructor() { }

  ngOnInit(): void {
  }

}
