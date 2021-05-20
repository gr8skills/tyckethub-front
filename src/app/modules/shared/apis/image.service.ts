import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {EventImageTypes} from '../models/enums';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  readonly httpOptions = environment.httpOptions;
  constructor(private httpClient: HttpClient) { }

  uploadImage(image: File, url: string, type = 'thumb'): Observable<any> {
    type = type.toLowerCase() as EventImageTypes;
    const formData = new FormData();
    let fileName = '';
    switch (type) {
      case EventImageTypes.BANNER:
        fileName = EventImageTypes.BANNER;
        break;
      case EventImageTypes.COVER:
        fileName = EventImageTypes.COVER;
        break;
      case EventImageTypes.MOBILE:
        fileName = EventImageTypes.MOBILE;
        break;
    }
    console.log('url', url);
    formData.append(fileName as string, image);
    console.log('formData', formData);
    return this.httpClient.post<any>(url, formData, this.httpOptions);
  }
}
