import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() {
  }

  handleError(err: any): Observable<never> {
    console.log('Error object: ', err);
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Back end return code ${err.status}: ${err.body.error}`;
    }
    console.log('Error => ', err);
    return throwError(errorMessage);
  }
}
