import { Injectable } from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  handsetLayout$ = this.breakpointObserver.observe(Breakpoints.Handset);
  status$: any;

  constructor(private breakpointObserver: BreakpointObserver) { }

}
