import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../shared/facades/authentication.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-artiste-page-header',
  templateUrl: './artiste-page-header.component.html',
  styleUrls: ['./artiste-page-header.component.scss']
})
export class ArtistePageHeaderComponent implements OnInit {
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
