import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

import {AuthenticationService} from '../../../shared/facades/authentication.service';
import {LocalStorageItems} from '../../../shared/models/enums';
import {BaseService} from '../../../shared/facades/base.service';
import {UiService} from '../../../shared/core/ui.service';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.scss']
})
export class EditMovieComponent implements OnInit {

  createdMovie: any = this.route.snapshot.data.event.data;
  movieStartTime = this.baseService.convertTimeToAMPMFormat(this.createdMovie.start_time);
  userRole: any;
  displayStyle = {};
  currentPath = '';
  constructor(private authService: AuthenticationService,
              private router: Router,
              private route: ActivatedRoute,
              private baseService: BaseService,
              private uiService: UiService) { }

  ngOnInit(): void {
    this.userRole = this.authService.currentUserValue.role;
    console.log('Created Movie => ', this.createdMovie);
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
  }

}
