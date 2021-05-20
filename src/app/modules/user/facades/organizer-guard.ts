import {Injectable} from '@angular/core';
import {AuthenticationService} from '../../shared/facades/authentication.service';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {LocalStorageItems, Roles} from '../../shared/models/enums';
import {BaseService} from '../../shared/facades/base.service';

@Injectable({
  providedIn: 'root'
})
export class OrganizerGuard implements CanActivate {

  constructor(private authService: AuthenticationService,
              private router: Router,
              private baseService: BaseService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> |
    Promise<boolean | UrlTree> | boolean | UrlTree {
    this.baseService.storeLocalItem(LocalStorageItems.RETURN_URL, state.url);
    const currentUser = this.authService.currentUserValue;
    if (!currentUser) {
      return false;
    }
    if (currentUser.role === Roles.ADMIN || currentUser.role === Roles.ORGANIZER || currentUser.role === Roles.STAFF) {
      return true;
    }
    this.router.navigateByUrl(this.baseService.getLocalItem(LocalStorageItems.RETURN_URL)).then(r => r);
    this.baseService.removeLocalItem(LocalStorageItems.RETURN_URL);
    return false;
  }
}
