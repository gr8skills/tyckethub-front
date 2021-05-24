import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {filter} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly endPoint = environment.apiBaseUrl;
  constructor(private httpClient: HttpClient) {
  }

  getRoles(): Observable<any> {
    return this.httpClient.get<any>(`${this.endPoint}/roles`);
  }
  getRegRoles(): Observable<any> {
    return this.httpClient.get<any>(`${this.endPoint}/register/roles`);
  }
}
