import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationService} from './authentication.service';
import {BaseService} from './base.service';
import {LocalStorageItems} from '../models/enums';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthenticationService,
              private router: Router,
              private baseService: BaseService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> |
    Promise<boolean | UrlTree> | boolean | UrlTree {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      return true;
    }

    this.baseService.storeLocalItem(LocalStorageItems.RETURN_URL, state.url);
    this.router.navigate(['/users/sign-in'],
      {
        queryParams: {
          returnUrl: this.baseService.getLocalItem(LocalStorageItems.RETURN_URL)
        }
      }).then();
    return false;
  }
}
