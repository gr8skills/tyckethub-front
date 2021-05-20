import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router, Event, NavigationStart, NavigationEnd} from '@angular/router';
import {MatSidenav} from '@angular/material/sidenav';
import {UiService} from '../../core/ui.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  @Input('parentContainer') parentContainer: MatSidenav | undefined;

  constructor(private router: Router,
              private uiService: UiService) {
    router.events.subscribe((routerEvent: Event) => {
      if (routerEvent instanceof NavigationStart) {
        uiService.blockPage();
      } else if (routerEvent instanceof NavigationEnd) {
        uiService.unBlockPage();
      }
    });
  }

  ngOnInit(): void {

  }

  navigateToPage(pagePath: string): void {
    this.router.navigate([pagePath]).then(() => {
      this.parentContainer?.close();
    });
  }

}
