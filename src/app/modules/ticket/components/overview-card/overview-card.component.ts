import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../shared/facades/authentication.service';

@Component({
  selector: 'app-overview-card',
  templateUrl: './overview-card.component.html',
  styleUrls: ['./overview-card.component.scss']
})
export class OverviewCardComponent implements OnInit {

  role: any;

  @Input('showViewButton') displayViewButton = true;
  constructor(private router: Router,
              private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  viewAll(): void {
    this.role = this.authService.currentUserValue.role;
    if (this.role === 'attendee'){
      this.router.navigateByUrl(`tickets/my-tickets`);
    }else {
      this.router.navigateByUrl(`tickets/organizer/overview`);
    }
  }

}
