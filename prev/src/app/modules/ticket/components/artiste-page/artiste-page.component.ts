import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-artiste-page',
  templateUrl: './artiste-page.component.html',
  styleUrls: ['./artiste-page.component.scss']
})
export class ArtistePageComponent implements OnInit {

  artiste = this.route.snapshot.data.artiste.data;
  events = this.route.snapshot.data.events.data;

  displayStyle = {};
  descriptionMasked = true;

  constructor(private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    console.log('Artiste ', this.artiste);
    console.log('Events ', this.events);
  }

  toggleSearchBox(toggleState: boolean): void {

  }

  navigateToArtistesPage(): void {
    // localStorage.setItem('toArtisteTab', 'true');
    this.router.navigateByUrl('/events').then();
  }

  navigateToHome(): void {
    this.router.navigateByUrl('/').then();
  }

  buyTicket(eventId: number): void {
    this.router.navigateByUrl(`/events/${eventId}/description`);
  }

  onReadMore(): void {
    this.descriptionMasked = false;
  }
}
