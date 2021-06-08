import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {MovieService} from '../apis/movie.service';
import {BaseService} from '../../shared/facades/base.service';
import {LocalStorageItems} from '../../shared/models/enums';
import {catchError} from 'rxjs/operators';
import {UiService} from '../../shared/core/ui.service';

@Injectable({
  providedIn: 'root'
})
export class MovieParentResolver implements Resolve<any> {
  constructor(private router: Router,
              private movieService: MovieService,
              private baseService: BaseService,
              private uiService: UiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    this.baseService.storeLocalItem(LocalStorageItems.RETURN_URL, state.url);
    const eventId = route.params.id;

    if (!eventId || isNaN(eventId)) {
      this.router.navigateByUrl(this.baseService.getLocalItem(LocalStorageItems.RETURN_URL) || '/home');
      this.baseService.removeLocalItem(LocalStorageItems.RETURN_URL);
      return of(null);
    }

    this.baseService.removeLocalItem(LocalStorageItems.RETURN_URL);
    return this.movieService.getMovie(+eventId).pipe(
      catchError(err => {
        const errorMessage = this.baseService.processResponseError(err) ?? 'Movie was not found';
        this.uiService.openSnotify(errorMessage, 'Error', 'error');
        this.router.navigateByUrl('/movies').then();
        return of(null);
      })
    );
  }
}
