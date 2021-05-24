import { Component, OnInit } from '@angular/core';
import {fadeInOnEnterAnimation, fadeOutOnLeaveAnimation} from 'angular-animations';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation()
  ]
})
export class SearchBoxComponent implements OnInit {

  tabs = ['events', 'flights', 'movies'];
  openTab = this.tabs[0];

  constructor() { }

  ngOnInit(): void { }

  selectTab(targetTab: string): void {
    this.openTab = targetTab;
    console.clear();
    console.log('OPEN TAB:', this.openTab);
  }
}
