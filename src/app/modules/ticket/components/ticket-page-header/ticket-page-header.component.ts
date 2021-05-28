import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../shared/facades/authentication.service';

@Component({
  selector: 'app-ticket-page-header',
  templateUrl: './ticket-page-header.component.html',
  styleUrls: ['./ticket-page-header.component.scss']
})
export class TicketPageHeaderComponent implements OnInit {

  isLoggedIn = false;
  userRole: any;
  userData: any;

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.loggedIn();
    this.userData = this.authService.currentUserValue;
    this.userRole = this.userData.role;
    console.log('LoggedIn User Role: ', this.userRole);
  }

  logout(): void {
    this.authService.logout();
  }
}
