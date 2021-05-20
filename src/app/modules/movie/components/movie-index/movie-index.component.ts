import { Component, OnInit } from '@angular/core';
import {Movie} from '../../models/movie.model';
import {MOVIES} from '../../../shared/data';

@Component({
  selector: 'app-movie-index',
  templateUrl: './movie-index.component.html',
  styleUrls: ['./movie-index.component.scss']
})
export class MovieIndexComponent implements OnInit {

  movies: Movie[] = MOVIES;
  filteredMovies: Movie[] = [];
  numberOfRows = 0;
  iterableArray: number[] = [];
  displayStyle = {};

  constructor() {
    this.filteredMovies = this.movies.filter(m => m.id !== 2);
  }

  ngOnInit(): void {
    this.numberOfRows = Math.ceil(this.filteredMovies.length / 4);
    this.iterableArray = this.range(1, this.numberOfRows);
  }

  toggleSearchBox(toggleState: boolean): void {
    console.log('State => ', toggleState);
    if (toggleState) {
      this.displayStyle = {display: 'block'};
    } else {
      this.displayStyle = {display: 'none'};
    }
  }
  private range(start: number, end: number): number[] {
    const length = end - start + 1;
    return Array.from({length}, (_, i) => start + i);
  }

}
