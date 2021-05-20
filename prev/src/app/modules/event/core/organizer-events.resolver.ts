import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {AuthenticationService} from '../../shared/facades/authentication.service';
import {LocalStorageItems} from '../../shared/models/enums';
import {BaseService} from '../../shared/facades/base.service';
import {EventFacadeService} from '../facades/event-facade.service';

@Injectable({
  providedIn: 'root'
})
export class OrganizerEventsResolver implements Resolve<any> {
  constructor(private authService: AuthenticationService,
              private router: Router,
              private baseService: BaseService,
              private eventFacade: EventFacadeService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    this.baseService.storeLocalItem(LocalStorageItems.RETURN_URL, state.url);
    const organizerId = +route.params.id;

    if (!organizerId) {
      this.router.navigateByUrl(this.baseService.getLocalItem(LocalStorageItems.RETURN_URL));
      this.baseService.removeLocalItem(LocalStorageItems.RETURN_URL);
      return of(null);
    }

    this.baseService.removeLocalItem(LocalStorageItems.RETURN_URL);
    return this.eventFacade.getOrganizerEvent(organizerId);
  }
}
