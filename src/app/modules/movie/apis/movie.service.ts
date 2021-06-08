import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Movie} from '../models/movie.model';
import {Observable, of, from, combineLatest, BehaviorSubject} from 'rxjs';
import {MOVIES} from '../../shared/data';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private readonly baseUrl = environment.apiBaseUrl;
  private readonly requestOptions = environment.httpOptions;

  movies = MOVIES;

  constructor(private httpClient: HttpClient) {
  }

  getMovies(): Observable<Movie[]> {
    return of(this.movies);
  }

  getMovie(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/movies/${id}`, this.requestOptions);
  }

  getActiveCountries(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/countries/active`, this.requestOptions);
  }

  getMovieGenres(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/movie-genres`, this.requestOptions);
  }
  getMovieRestrictions(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/event-age-restrictions`, this.requestOptions);
  }

  getArtistes(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/artistes`);
  }

  getSimilarMovies(id: number): Observable<any> {
    return this.httpClient.get<any[]>(`${this.baseUrl}/similar-events/${id}`, this.requestOptions);
  }

  addMovie(event: any): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/movies`, event, this.requestOptions);
  }

  updateMovie(event: any): Observable<any> {
    return this.httpClient.patch<any>(`${this.baseUrl}/movies/${event.id}`, event, this.requestOptions);
  }

  uploadMovieImages(imagePayload: any, eventId: number): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    return this.httpClient.post<any>(`${this.baseUrl}/movies/${eventId}/images`, imagePayload, {headers});
  }
}
