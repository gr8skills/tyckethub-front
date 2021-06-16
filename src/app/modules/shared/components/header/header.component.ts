import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {AuthenticationService} from '../../facades/authentication.service';
import {UiService} from '../../core/ui.service';
import {Router, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Output() toggleSearchBoxEvent = new EventEmitter<boolean>();
  searchBoxVisible = false;
  isLoggedIn = false;
  routerEventSub = new Subscription();
  userRole: any;
  userData: any;

  constructor(private authService: AuthenticationService,
              private uiService: UiService,
              private router: Router) {
    this.routerEventSub = this.router.events.subscribe((routerEvent: Event) => {
      if (routerEvent instanceof NavigationStart) {
        // console.log('Navigation start');
        this.uiService.blockPage();
      }
      if (routerEvent instanceof NavigationEnd || routerEvent instanceof NavigationCancel
        || routerEvent instanceof NavigationError) {
        // console.log('Navigation end');
        this.uiService.unBlockPage();
      }
    });
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.loggedIn();
    this.userData = this.authService.currentUserValue;
    console.log('This User', this.userData);
    if (this.isLoggedIn && (this.userData !== '' || this.userData !== null)){
      this.userRole = this.userData.role;
    }
  }

  toggleSearchBox(): void {
    this.searchBoxVisible = !this.searchBoxVisible;
    this.toggleSearchBoxEvent.emit(this.searchBoxVisible);
  }

  logout(): void {
    this.authService.logout();
  }

  dashboardOrganizer(): void {
    const path = 'organizer/overview';
    this.router.navigateByUrl(`/tickets/${path}`).then(r => `/tickets/${path}`);
  }
  dashboardAttendee(): void {
    const path = 'overview';
    this.router.navigateByUrl(`/tickets/${path}`).then(r => `/tickets/${path}`);
  }

  ngOnDestroy(): void {
    this.routerEventSub.unsubscribe();
  }
}
