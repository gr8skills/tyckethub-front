import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {MovieService} from '../apis/movie.service';
import {LocalStorageItems} from '../../shared/models/enums';

@Injectable({
  providedIn: 'root'
})
export class MovieResolver implements Resolve<any> {
  constructor(private movieService: MovieService,
              private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

    const movieId = route.parent?.params.id;

    if (!movieId) {
      this.router.navigateByUrl(localStorage.getItem(LocalStorageItems.RETURN_URL) || '/home').then();
      return of(null);
    }
    return this.movieService.getMovie(+movieId);
  }
}
