import { Component, OnInit } from '@angular/core';
import {Lightbox, LightboxConfig} from 'ngx-lightbox';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.scss']
})
export class FlightListComponent implements OnInit {

  date = new Date();
  flightSearchBoxVisible = false;
  lightBoxConfig: LightboxConfig = {
    fitImageInViewPort: true,
    disableScrolling: true,
    centerVertically: true,
    fadeDuration: 0.7,
    positionFromTop: 20,
    resizeDuration: 0.5,
    showImageNumberLabel: false,
    alwaysShowNavOnTouchDevices: false,
    wrapAround: true,
    disableKeyboardNav: true,
    enableTransition: true,
    albumLabel: 'Image %1 of %2',
    showZoom: false,
    showRotation: false
  };
  lightBoxAlbum = [
    {
      src: 'assets/images/img_106-lg.png',
      caption: 'Destination pictures',
      thumb: 'assets/images/img_106-sm.png'
    },
    {
      src: 'assets/images/img_107-lg.png',
      caption: 'Destination pictures',
      thumb: 'assets/images/img_107-sm.png'
    },
    {
      src: 'assets/images/img_108-lg.png',
      caption: 'Destination pictures',
      thumb: 'assets/images/img_108-sm.png'
    }
  ];

  navButtons = {
    cheapest: true,
    fastest: false,
    recommended: false,
  };
  displayStyle = {};
  constructor(private lightbox: Lightbox) {
  }

  ngOnInit(): void {

  }

  showFlightSearchBox(): void {
    this.flightSearchBoxVisible = true;
  }

  hideFlightSearchBox(): void {
    this.flightSearchBoxVisible = false;
  }

  openLightBox(index: number): void {
    this.lightbox.open(this.lightBoxAlbum, index, this.lightBoxConfig);
  }

  closeLightBox(): void {
    this.lightbox.close();
  }

  activateTab(target: string): void {
    const targetTab = target.toLowerCase();

    switch (targetTab) {
      case 'cheapest':
        this.navButtons.cheapest = true;
        this.navButtons.fastest = false;
        this.navButtons.recommended = false;
        break;
      case 'fastest':
        this.navButtons.cheapest = false;
        this.navButtons.fastest = true;
        this.navButtons.recommended = false;
        break;
      case 'recommended':
        this.navButtons.cheapest = false;
        this.navButtons.fastest = false;
        this.navButtons.recommended = true;
        break;
      default:
        this.navButtons.cheapest = true;
        this.navButtons.fastest = false;
        this.navButtons.recommended = false;
        break;
    }
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
