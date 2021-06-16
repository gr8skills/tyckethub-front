import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieStatusService {

  constructor(private httpClient: HttpClient) { }
  private baseUrl = environment.apiBaseUrl;

  status$ = this.httpClient.get<any>(`${this.baseUrl}/statuses`);

}
