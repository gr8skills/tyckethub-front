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

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.loggedIn();
    this.userRole = this.authService.getUserRole();
  }

  logout(): void {
    this.authService.logout();
  }
}
