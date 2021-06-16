import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {MovieFacadeService} from '../../facades/movie-facade.service';

@Component({
  selector: 'app-complete-movie',
  templateUrl: './complete-movie.component.html',
  styleUrls: ['./complete-movie.component.scss']
})
export class CompleteMovieComponent implements OnInit {

  readonly endPoint = environment.apiBaseUrl;
  url = '';
  processCompleted = false;
  constructor(private movieFacade: MovieFacadeService) { }

  ngOnInit(): void {
    const createdMovie = JSON.parse(localStorage.getItem('createdMovie') as string);
    const movieId = createdMovie.id;
    this.url = `${this.endPoint}/movies/${movieId}/images`;
    this.movieFacade.movieCreationComplete$.subscribe(x => this.processCompleted = x);
  }

  // TODO: Check progress and notify the admin/staff

}
