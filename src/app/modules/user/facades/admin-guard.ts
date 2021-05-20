import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../../shared/facades/authentication.service';
import {Roles} from '../../shared/models/enums';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthenticationService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> |
    Promise<boolean | UrlTree> | boolean | UrlTree {
    const currentUser = this.authService.currentUserValue;

    if (!currentUser) {
      return false;
    }
    if (currentUser.role === Roles.ADMIN) {
      return true;
    }
    const returnUrl = state.url;
    this.router.navigate([returnUrl]);
    return false;
  }
}
