import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../shared/facades/authentication.service';
import {Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import {UiService} from '../../../shared/core/ui.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-movie-page-header',
  templateUrl: './movie-page-header.component.html',
  styleUrls: ['./movie-page-header.component.scss']
})
export class MoviePageHeaderComponent implements OnInit, OnDestroy {

  carouselImages = [
    'assets/images/img_68.jpg',
    'assets/images/img_69.jpg',
    'assets/images/img_70.jpg'
  ];
  isLoggedIn = false;
  routerEventSub = new Subscription();
  userRole: any;

  constructor(private authService: AuthenticationService,
              private router: Router,
              private uiService: UiService) {
    this.routerEventSub = this.router.events.subscribe((routerEvent: Event) => {
      if (routerEvent instanceof NavigationStart) {
        this.uiService.blockPage();
      }
      if (routerEvent instanceof NavigationEnd || routerEvent instanceof NavigationCancel
        || routerEvent instanceof NavigationError) {
        this.uiService.unBlockPage();
      }
    });
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.loggedIn();
    this.userRole = this.authService.currentUserValue.role;
    console.log('this.userRole ', this.userRole);
  }

  logout(): void {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.routerEventSub.unsubscribe();
  }
}
