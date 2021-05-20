import { Component, OnInit } from '@angular/core';
import {Lightbox, LightboxConfig} from 'ngx-lightbox';

@Component({
  selector: 'app-fligth-comparison-detail',
  templateUrl: './flight-comparison-detail.component.html',
  styleUrls: ['./flight-comparison-detail.component.scss']
})
export class FlightComparisonDetailComponent implements OnInit {

  date = new Date();
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
  detailShown = false;
  displayStyle = {};

  constructor(private lightbox: Lightbox) { }

  ngOnInit(): void {
  }

  openLightBox(index: number): void {
    this.lightbox.open(this.lightBoxAlbum, index, this.lightBoxConfig);
  }

  closeLightBox(): void {
    this.lightbox.close();
  }

  toggleDetail(): void {
    this.detailShown = !this.detailShown;
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
