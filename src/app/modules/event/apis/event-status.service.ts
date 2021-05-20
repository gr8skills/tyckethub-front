import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {IEventStatus} from '../models/event-status.model';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventStatusService {
  private baseUrl = environment.apiBaseUrl;

  status$ = this.httpClient.get<any>(`${this.baseUrl}/statuses`);

  constructor(private httpClient: HttpClient) { }
}
