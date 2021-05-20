import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';
import 'lazysizes/plugins/unveilhooks/ls.unveilhooks';
// import {lazySizes} from 'lazysizes';

@Directive({
  selector: '[appLazyload]',
  exportAs: 'lazyload'
})
export class LazyloadDirective implements OnInit {

  tempImage = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
  @Input('lazyload') imgSrc: string;
  img: string;

  constructor(private el: ElementRef,
              private renderer: Renderer2) {
    this.img = '';
    this.imgSrc = '';
  }

  ngOnInit(): void {
    // this.img = require(`assets/images${this.imgSrc}`);
    this.initLazyLoading();
    this.setAttributes();
  }

  initLazyLoading(): void {
    // if (lazySizes) {
    //   lazySizes.init();
    // }
  }

  setAttributes(): void {
    this.renderer.addClass(this.el.nativeElement, 'lazyload');
    if (this.el.nativeElement.localName === 'img') {
      this.setImgSrc();
    } else {
      //
    }
  }

  setImgSrc(): void {
    this.renderer.setAttribute(this.el.nativeElement, 'data-src', this.img);
    this.renderer.setAttribute(this.el.nativeElement, 'src', this.tempImage);
  }

  setElementBackgroundImage(): void {
    this.renderer.setAttribute(this.el.nativeElement, 'data-bg', this.img);
    this.renderer.setAttribute(this.el.nativeElement, 'background-image', `url(${this.tempImage})`);
  }
}
