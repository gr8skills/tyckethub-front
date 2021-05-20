import {Directive, ElementRef, HostListener, Input, OnChanges, Renderer2} from '@angular/core';

@Directive({
  selector: '[appMaterialCardElevation]'
})
export class MaterialCardElevationDirective implements OnChanges{

  @Input() defaultElevation: number;
  @Input() raisedElevation: number;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.defaultElevation = 2;
    this.raisedElevation = 6;
    this.setElevation(this.defaultElevation);
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.setElevation(this.raisedElevation);
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.setElevation(this.defaultElevation);
  }

  ngOnChanges(): void {
    this.setElevation(this.defaultElevation);
  }

  private setElevation(elevation: number): void {
    // // Step 1. Remove existing elevation if any
    // const classesToRemove =  Array.from((this.elementRef.nativeElement as HTMLElement).classList).filter(cl => cl.startsWith('mat-elevation-z'));
    // classesToRemove.forEach((c) => {
    //   this.renderer.removeClass(this.elementRef.nativeElement, c);
    // });
    // // Step 2. Add the given elevation
    // const newClass = `mat-elevation-z${elevation}`;
    // this.renderer.addClass(this.elementRef.nativeElement, newClass);

    // remove all elevation classes
    const classesToRemove = Array.from((this.elementRef.nativeElement as HTMLElement).classList).filter(c => c.startsWith('mat-elevation-z'));
    classesToRemove.forEach((c) => {
      this.renderer.removeClass(this.elementRef.nativeElement, c);
    });

    // add the given elevation class
    const newClass = `mat-elevation-z${elevation}`;
    this.renderer.addClass(this.elementRef.nativeElement, newClass);
  }

}
