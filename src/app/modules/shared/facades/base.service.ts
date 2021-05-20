import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {EventImageTypes, LocalStorageItems} from '../models/enums';
import {ImageSnippet} from '../models/image-snippet.model';
import {ImageService} from '../apis/image.service';
import {UiService} from '../core/ui.service';
import {EventTicket, EventUploadedImages} from '../models/custom-types';


@Injectable({
  providedIn: 'root'
})
export class BaseService {
  // Http Options
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };

  constructor(private router: Router,
              private imageService: ImageService,
              private uiService: UiService) {
  }

  convertInputTimeString(timeString: string): string {
    const timeStringArray = timeString.split(' ');
    const pastNoon = timeStringArray[1] === 'PM';
    if (!pastNoon) {
      // console.log('TIME-STRING: ', timeStringArray[0] + ':00');
      return timeStringArray[0] + ':00';
    }
    const hour = +timeStringArray[0].split(':')[0];
    const min = timeStringArray[0].split(':')[1];
    let hourFormat = 12 + hour;
    hourFormat = hourFormat < 24 ? hourFormat : 0;
    // console.log('Hour format ', hourFormat, 'Minute ', min);
    // console.log('TIME-STRING: ', `${hourFormat}:${min}:00`);
    return `${hourFormat}:${min}:00`;
  }

  convertTimeToAMPMFormat(timeString: string): string {
    let pastNoon = 'AM';
    const timeParts = timeString.split(':');
    pastNoon = +timeParts[0] > 12 ? 'PM' : 'AM';
    let hourPart = +timeParts[0] % 12;
    if (hourPart === 0) {
      hourPart = 12;
    }
    // console.log('Converted time ', `${hourPart}:${timeParts[1]} ${pastNoon}`);
    return `${hourPart}:${timeParts[1]} ${pastNoon}`;
  }

  deleteReturnUrl(): void {
    if (localStorage.getItem(LocalStorageItems.RETURN_URL)) {
      localStorage.removeItem(LocalStorageItems.RETURN_URL);
    }
  }

  navigateToArtistesPage(): void {
    localStorage.setItem('toArtistTab', 'true');
    this.router.navigateByUrl('/');
  }

  processResponseError(error: any): string {
    let errorMessage = '';

    if (error instanceof Object) {
      const firstError = Object.keys(error)[0];
      errorMessage = error[firstError][0];
    } else {
      errorMessage = error;
    }

    return errorMessage;
  }

  // For uploading individual images outside form
  processFile(imageInput: any, imageLabel: string, url: string): void {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    const onSuccess = (selectedFile: ImageSnippet): void => {
      selectedFile.pending = false;
      selectedFile.status = 'ok';
      this.uiService.openSnotify('Image uploaded successfully.', 'Done',
        'success');
    };
    const onError = (selectedFile: ImageSnippet): void => {
      selectedFile.pending = true;
      selectedFile.status = 'fail';
      selectedFile.src = '';
      this.uiService.openSnotify('Error uploading image. Try again later.', 'Prompt',
        'warning');
    };

    reader.addEventListener('load', (event: any) => {
      let type = '';

      switch (imageLabel) {
        case 'banner':
          type = 'banner';
          break;
        case 'thumb':
          type = 'thumb';
          break;
        case 'mobile':
          type = 'mobile';
          break;
      }
      const selectedFile = new ImageSnippet(event.target.result, file);
      selectedFile.pending = true;
      this.imageService.uploadImage(selectedFile.file, url, type).subscribe(
        (res) => {
          if (!res) {
            this.uiService.openSnotify('File upload failed', 'OOPS', 'error');
            return;
          }
          console.log('Image upload Response => ', res);
          onSuccess(selectedFile);
        },
        (error) => {
          console.log('Image upload error => ', error);
          onError(selectedFile);
        }
      );
    });
    reader.readAsDataURL(file);
  }

  storeLocalItem(itemName: string, itemValue: string): void {
    localStorage.setItem(itemName, itemValue);
  }

  getLocalItem(itemName: string): string {
    return localStorage.getItem(itemName) as string;
  }

  removeLocalItem(itemName: string): void {
    localStorage.removeItem(itemName);
  }

  processEventImages(createdEventImages: any[]): EventUploadedImages {
    if (!createdEventImages) {
      return { banner: '', mobile: '', thumb: '' };
    }
    const images: EventUploadedImages = {banner: '', thumb: '', mobile: ''};

    createdEventImages.forEach(image => {
      switch (image.tag as EventImageTypes) {
        case EventImageTypes.BANNER:
          images.banner = image.image_url;
          break;
        case EventImageTypes.COVER:
          images.thumb = image.image_url;
          break;
        case EventImageTypes.MOBILE:
          images.mobile = image.image_url;
      }
    });

    return images;
  }

  processEventTickets(createdEventTicket: any[]): any[] {
    if (!createdEventTicket) {
      return [];
    }

    const ticketArray: EventTicket[] = [];
    createdEventTicket.forEach(ticket => {
      const abridgedTicket: EventTicket = {price: 0, maximumAllowed: 1, title: '', type: 1, id: 1 };
      abridgedTicket.price = ticket.price;
      abridgedTicket.maximumAllowed = ticket.setting.allowed_per_order_max;
      abridgedTicket.title = ticket.title;
      abridgedTicket.type = ticket.type;
      abridgedTicket.id = +ticket.id;

      ticketArray.push(abridgedTicket);
    });

    return ticketArray;
  }

  mapEventLocationPlatformToString(locationPlatformNumber: number): string {
    let returnValue = '';
    switch (locationPlatformNumber) {
      case 1:
        returnValue = 'Live';
        break;
      case 2:
        returnValue = 'Online';
        break;
      case 3:
        returnValue = 'To Be Announced';
        break;
    }

    return returnValue;
  }
}
