import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {IUser} from '../../user/models/user.model';
import {environment} from '../../../../environments/environment';
import {Router} from '@angular/router';
import {BaseService} from './base.service';
import {UiService} from '../core/ui.service';
import {LocalStorageItems, Roles} from '../models/enums';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  private currentUserSubject = new BehaviorSubject<IUser>(JSON.parse(localStorage.getItem('currentUser') as string) as IUser);
  public currentUser = this.currentUserSubject.asObservable();
  returnUrl: string;
  private readonly requestHeaderOptions = this.baseService.httpOptions;

  constructor(private http: HttpClient,
              private router: Router,
              private baseService: BaseService,
              private uiService: UiService) {
    this.returnUrl = baseService.getLocalItem(LocalStorageItems.CURRENT_USER);
  }

  // Local My
  public endPoint = environment.apiBaseUrl;
  public endPointAuth = `${this.endPoint}/auth`;

  private iss = {
    login: `${this.endPointAuth}/login`,
    register: `${this.endPointAuth}/register`
  };

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  // Login user
  login(credential: any): Observable<any> {
    return this.http.post<any>(`${this.endPointAuth}/login`, credential, this.requestHeaderOptions);
  }

  // Register a new user
  public createUser(formData: any): Observable<any> {
    return this.http.post<any>(`${this.endPointAuth}/register`, formData, this.requestHeaderOptions);
  }

  // Send Password Reset Request
  public sendResetPassword(email: object): Observable<any> {
    return this.http.post<any>(`${this.endPoint}/reset-password`, email);
  }

  // Re-Send Email Confirmation Mail
  public resendEmailConfirmation(data: any): Observable<any> {
    return this.http.post<any>(`${this.endPoint}/resend-email-confirmation`, data, this.requestHeaderOptions);
  }

  // change Password
  public changePassword(resetData: object): Observable<any> {
    return this.http.post<any>(`${this.endPoint}/change-password`, resetData, this.requestHeaderOptions);
  }

  // Verify Email
  public verifyEmail(data: any): Observable<any> {
    return this.http.post<any>(`${this.endPointAuth}/verify`, data, this.requestHeaderOptions);
  }

  // handle token
  handleToken(token: any): void {
    this.setToken(token);
  }

  handleResponse(data: any): void {
    if (data.user && data.token) {
      this.handleToken(data.token);

      this.setUser(data.user);
      // set user access Data for later reference
      if (this.returnUrl) {
        this.router.navigate([this.returnUrl]).then(x => x);
      }
      this.baseService.removeLocalItem(LocalStorageItems.RETURN_URL);
    }
  }

  // Set access token
  setToken(token: any): any {
    this.baseService.storeLocalItem(LocalStorageItems.ACCESS_TOKEN, token);
  }

  // setUser
  setUser(user: any): void {
    this.baseService.storeLocalItem(LocalStorageItems.CURRENT_USER, JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  // set basic user data
  setUserData({data}: { data: any }): any {
    this.baseService.storeLocalItem(LocalStorageItems.USER_DATA, JSON.stringify(data));
  }

  removeUser(): any {
    return this.baseService.removeLocalItem(LocalStorageItems.CURRENT_USER);
  }

  // get user data from storage
  getUserData(): any {
    return this.baseService.getLocalItem(LocalStorageItems.USER_DATA);
  }

  // remove user data from storage
  removeUserData(): any {
    return this.baseService.removeLocalItem(LocalStorageItems.USER_DATA);
  }

  getUserRole(): string | null {
    if (this.currentUserValue) {
      return this.currentUserValue.role === Roles.ORGANIZER ? Roles.ORGANIZER : Roles.ATTENDEE;
    }
    return null;
  }

  getToken(): any {
    return this.baseService.getLocalItem(LocalStorageItems.ACCESS_TOKEN);
  }

  removeToken(): any {
    return this.baseService.removeLocalItem(LocalStorageItems.ACCESS_TOKEN);
  }

  isValidToken(): boolean {

    const token = this.getToken();

    if (token) {

      const payload = this.payload(token);

      if (payload) {
        return Object.values(this.iss).indexOf(payload.iss) > -1;
      }
    }


    return false;
  }


  payload(token: any): any {
    const payload = token.split('.')[1];

    return this.decode(payload);
  }


  decode(payload: any): any {
    return JSON.parse(atob(payload));
  }

  loggedIn(): any {
    // tslint:disable-next-line:variable-name
    const access_token = this.baseService.getLocalItem(LocalStorageItems.ACCESS_TOKEN);
    return !!access_token;
  }

  refresh(): void {
    window.location.reload();
  }

  logout(): void {
    // remove user from local storage to log user out
    const userId = this.currentUserValue.id;
    const formData = new FormData();
    formData.append('user_id', userId);
    this.baseService.removeLocalItem(LocalStorageItems.RETURN_URL);
    localStorage.clear();

    this.uiService.blockPage();
    this.removeUser();

    // remove access_token
    this.removeToken();
    this.currentUserSubject.complete();
    this.refresh();
    if (this.router.url === 'home') {
      location.reload(true);
    } else {
      this.router.navigate(['/login']).then();
    }
    this.http.post<any>(`${this.endPointAuth}/logout`, formData, this.requestHeaderOptions).subscribe(
      x => {
        this.uiService.unBlockPage();
        console.log('User ID => ', userId);
      },
      error => {
        this.uiService.unBlockPage();
        console.log(error);
      },
    );
  }

  getSlides(): Observable<any> {
    return this.http.get<any>(`${this.endPoint}/homepage/slides`, this.requestHeaderOptions);
  }
}
