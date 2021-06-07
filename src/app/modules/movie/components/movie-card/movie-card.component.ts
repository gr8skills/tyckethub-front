import { Component, OnInit, Input } from '@angular/core';
import {Movie} from '../../models/movie.model';
import {ThemePalette} from '@angular/material/core';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {

  @Input('movie') movie: Movie;
  @Input('isFavorite') isFavorite = false;

  readonly backendPath = environment.backendPath;
  favColor: ThemePalette = 'warn';

  constructor() {
    this.movie = new Movie();
  }

  ngOnInit(): void {
  }

  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
  }

}
