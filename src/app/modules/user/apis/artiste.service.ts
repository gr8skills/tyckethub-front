import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArtisteService {
  private readonly endPoint = environment.apiBaseUrl;
  private readonly requestOption = environment.httpOptions;

  constructor(private httpClient: HttpClient) {
  }

  getArtistes(): Observable<any> {
    return this.httpClient.get<any>(`${this.endPoint}/artistes`, this.requestOption);
  }

  getArtiste(artisteId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.endPoint}/artistes/${artisteId}`, this.requestOption);
  }

  getArtisteEvents(artisteId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.endPoint}/artistes/${artisteId}/events`, this.requestOption);
  }

  deleteArtisteData(payload: any): Observable<any> {
    return this.httpClient.delete<any>(`${this.endPoint}/artiste/delete/${payload}`, this.requestOption);
  }

  createArtisteData(payload: any): Observable<any> {
    return this.httpClient.post<any>(`${this.endPoint}/artiste-data/create`, payload, this.requestOption);
  }
}
