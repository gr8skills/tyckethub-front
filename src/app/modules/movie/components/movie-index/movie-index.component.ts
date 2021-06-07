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
  filteredNowPlaying: Movie[] = [];
  filteredComingSoon: Movie[] = [];
  filteredBlockbuster: Movie[] = [];
  filteredDrama: Movie[] = [];
  filteredAction: Movie[] = [];
  filteredThriller: Movie[] = [];
  filteredComedy: Movie[] = [];
  numberOfRows = 0;
  iterableArray: number[] = [];
  displayStyle = {};
  ids = [];

  constructor() {
    this.filteredMovies = this.movies.filter(m => m.id !== 2);
    this.filteredNowPlaying = this.movies.filter(m => m.released);
    this.filteredComingSoon = this.movies.filter(m => !m.released);
    // tslint:disable-next-line:max-line-length
    this.filteredBlockbuster = this.movies.filter(m => (m.genre[0] === 'Blockbuster') || (m.genre[1] === 'Blockbuster'));
    this.filteredDrama = this.movies.filter(m => (m.genre[0] === 'Drama') || (m.genre[1] === 'Drama'));
    this.filteredAction = this.movies.filter(m => (m.genre[0] === 'Action') || (m.genre[1] === 'Action'));
    this.filteredThriller = this.movies.filter(m => (m.genre[0] === 'Thriller') || (m.genre[1] === 'Thriller'));
    this.filteredComedy = this.movies.filter(m => (m.genre[0] === 'Comedy') || (m.genre[1] === 'Comedy'));
  }



  ngOnInit(): void {
    this.numberOfRows = Math.ceil(this.filteredMovies.length / 4);
    this.iterableArray = this.range(1, this.numberOfRows);
    const passed = [12, 5, 8, 130, 44, 9, 9.9, 10.1, 1].filter(this.isBigEnough);
    // console.log('Filtered Movies: ', this.filteredMovies);
    // console.log('Test Value : ' + passed );
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

  private isBigEnough(element: any, index: any, array: any): any {
    return element >= 10;
  }


}
