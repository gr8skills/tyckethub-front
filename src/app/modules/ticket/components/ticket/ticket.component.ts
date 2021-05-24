import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../shared/facades/authentication.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {

  currentPath = 'My Tickets';
  displayStyle = {};
  userRole: any;

  constructor(private router: Router,
              private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole();
  }

  toggleSearchBox(toggleState: boolean): void {
    if (toggleState) {
      this.displayStyle = {display: 'block'};
    } else {
      this.displayStyle = {display: 'none'};
    }
  }

  navigateToPath(path: string): void {
    switch (path) {
      case 'overview':
        this.currentPath = 'Overview';
        break;
      case 'my-tickets':
        this.currentPath = 'My Tickets';
        break;
      case 'sales':
        this.currentPath = 'My Sales';
        break;
      case 'payments':
        this.currentPath = 'Payments';
        break;
      case 'favorites':
        this.currentPath = 'Favourites';
        break;
      case 'rf-id':
        this.currentPath = 'RF ID';
        break;
      case 'settings':
        this.currentPath = 'Settings';
        break;
    }

    this.router.navigate([`/tickets/${path}`])
      .then();
  }
}
