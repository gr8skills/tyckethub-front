import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrganizerService {
  private readonly endPoint = environment.apiBaseUrl;
  private readonly requestOption = environment.httpOptions;

  constructor(private httpClient: HttpClient) { }

  getOrganizerEvents(organizerId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.endPoint}/organizers/${organizerId}/events`, this.requestOption);
  }
  getOrganizerMovies(organizerId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.endPoint}/organizers/${organizerId}/movies`, this.requestOption);
  }

  getOrganizerUncompletedEvents(organizerId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.endPoint}/organizers/${organizerId}/uncompleted-events`, this.requestOption);
  }
  getOrganizerUncompletedMovies(organizerId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.endPoint}/organizers/${organizerId}/uncompleted-movies`, this.requestOption);
  }

  getOrganizerTickets(organizerId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.endPoint}/organizers/${organizerId}/tickets`, this.requestOption);
  }
}
