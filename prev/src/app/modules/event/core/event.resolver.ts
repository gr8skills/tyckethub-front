import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {EventService} from '../apis/event.service';
import {LocalStorageItems} from '../../shared/models/enums';

@Injectable({
  providedIn: 'root'
})
export class EventResolver implements Resolve<any> {
  constructor(private eventService: EventService,
              private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

    const eventId = route.parent?.params.id;

    if (!eventId) {
      this.router.navigateByUrl(localStorage.getItem(LocalStorageItems.RETURN_URL) || '/home').then();
      return of(null);
    }
    return this.eventService.getEvent(+eventId);
  }
}
