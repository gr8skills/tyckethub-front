import {Component, OnDestroy, OnInit} from '@angular/core';
import {UiService} from './modules/shared/core/ui.service';
import {SPINNER} from 'ngx-ui-loader';
import {Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  SPINNER = SPINNER;
  currentPath = '';
  routeEventSub = new Subscription();

  constructor(private uiService: UiService,
              private router: Router) {
    // this.routeEventSub = this.router.events.subscribe((routerEvent: Event) => {
    //     if (routerEvent instanceof NavigationStart) {
    //       this.uiService.blockPage();
    //     }
    //
    //     if (routerEvent instanceof NavigationEnd || routerEvent instanceof NavigationCancel
    //       || routerEvent instanceof NavigationError) {
    //       this.uiService.unBlockPage();
    //     }
    //   }
    // );
  }

  ngOnInit(): void {
  }

  setCurrentPath(): void {
    localStorage.setItem('currentPath', this.currentPath);
  }

  ngOnDestroy(): void {
    this.routeEventSub.unsubscribe();
  }
}
