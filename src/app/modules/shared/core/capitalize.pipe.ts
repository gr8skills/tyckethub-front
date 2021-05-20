import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  private capitalizeFirstChar = (chars: string): string => chars.charAt(0).toUpperCase() + chars.substr(1);

  transform(value: string): string | null {

    if (!value) {
      return null;
    }

    value = value.trim();

    if (value.indexOf(' ') === -1) {
      return value[0].toUpperCase() + value.substr(1);
    }

    const tempArray: string[] = [];
    const tempString = ' ';
    const arrayFromString = value.split(' ');
    arrayFromString.forEach(word => {
      tempArray.push(this.capitalizeFirstChar(word) + ' ');
    });
    return tempString.concat(...tempArray).trim();
  }
}
