import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-how-to-sell',
  templateUrl: './how-to-sell.component.html',
  styleUrls: ['./how-to-sell.component.scss']
})
export class HowToSellComponent implements OnInit {

  displayStyle = {};

  constructor() { }

  ngOnInit(): void {
  }

  toggleSearchBox(toggleState: boolean): void {
    if (toggleState) {
      this.displayStyle = {display: 'block'};
    } else {
      this.displayStyle = {display: 'none'};
    }
  }
}
