import {Pipe, PipeTransform} from '@angular/core';
import {TimeFormats} from '../models/custom-types';
import {BaseService} from '../facades/base.service';

@Pipe({
  name: 'timeFormat'
})
export class TimeFormatPipe implements PipeTransform {

  constructor(private baseService: BaseService) {
  }

  transform(value: string, format: string): string {

    if (!value || !String(value)) {
      return '';
    }

    if (format === TimeFormats.AP) {
      return this.baseService.convertTimeToAMPMFormat(value);
    }

    return this.baseService.convertInputTimeString(value);
  }

}
