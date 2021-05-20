import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {BaseService} from '../../shared/facades/base.service';
import {UiService} from '../../shared/core/ui.service';
import {LocalStorageItems} from '../../shared/models/enums';
import {ArtisteService} from '../apis/artiste.service';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArtisteResolver implements Resolve<any> {
  constructor(private router: Router,
              private baseService: BaseService,
              private uiService: UiService,
              private artisteService: ArtisteService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    this.baseService.storeLocalItem(LocalStorageItems.RETURN_URL, state.url);

    const artisteId = route.params.id;
    if (!artisteId || isNaN(+artisteId)) {
      this.router.navigateByUrl(this.baseService.getLocalItem(LocalStorageItems.RETURN_URL));
      this.baseService.removeLocalItem(LocalStorageItems.RETURN_URL);
      return of(null);
    }

    return this.artisteService.getArtiste(+artisteId).pipe(
      catchError(err => {
        const errorMessage = this.baseService.processResponseError(err) ?? 'Error fetching artiste';
        this.uiService.openSnotify(errorMessage, 'Error', 'error');
        this.router.navigateByUrl(this.baseService.getLocalItem(LocalStorageItems.RETURN_URL));
        this.baseService.removeLocalItem(LocalStorageItems.RETURN_URL);
        return of(null);
      })
    );
  }
}
