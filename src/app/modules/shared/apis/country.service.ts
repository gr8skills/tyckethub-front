import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private readonly endPoint = environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) {
  }

  fetchCountryFlag(countryName: string): Observable<any> {
    return this.httpClient.get<any>(`${this.endPoint}/countries/${countryName}/flag`);
  }

  getActiveCountries(): Observable<any> {
    return this.httpClient.get<any>(`${this.endPoint}/countries/active`);
  }
}
