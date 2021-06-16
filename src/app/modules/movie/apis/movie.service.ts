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

  addMovie(movie: any): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/movies`, movie, this.requestOptions);
  }

  updateMovie(movie: any): Observable<any> {
    return this.httpClient.patch<any>(`${this.baseUrl}/movies/${movie.id}`, movie, this.requestOptions);
  }

  uploadMovieImages(imagePayload: any, movieId: number): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    return this.httpClient.post<any>(`${this.baseUrl}/movies/${movieId}/images`, imagePayload, {headers});
  }

  createMovieOnlinePlatform(platformPayload: any, movieId: number): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/movies/${movieId}/onlinePlatform`, platformPayload, this.requestOptions);
  }

  createMovieOnlinePlatformExtra(platformExtraPayload: any, movieId: number): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/movies/${movieId}/onlinePlatformExtra`, platformExtraPayload, this.requestOptions);
  }

  createMovieTicketWithSettings(payload: any, movieId: number): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/movies/${movieId}/tickets`, payload, this.requestOptions);
  }

  publishMovie(payload: any, movieId: number): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/movies/${movieId}/publish`, payload, this.requestOptions);
  }

  unPublishMovie(movieId: number): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/movies/${movieId}/unpublish`, this.requestOptions);
  }

  approveMovie(movieId: any): Observable<any> {
    let id = parseInt(movieId);
    console.log('Approve ', movieId);
    return this.httpClient.post<any>(`${this.baseUrl}/movies/status/${id}/approve`, this.requestOptions);
  }
}
