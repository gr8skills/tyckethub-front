import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-artiste-card',
  templateUrl: './artiste-card.component.html',
  styleUrls: ['./artiste-card.component.scss']
})
export class ArtisteCardComponent implements OnInit {
  @Input('artiste') artiste: any;
  constructor() { }

  ngOnInit(): void {
  }

}
