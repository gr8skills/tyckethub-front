import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private readonly baseUrl = environment.apiBaseUrl;
  constructor(private httpClient: HttpClient) { }

  getCountryStates(countryId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/countries/${countryId}/states`);
  }

}
