import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'summary'
})
export class SummaryPipe implements PipeTransform {

  transform(value: string): string {
    const wordsArray = value.split(' ');
    const wordCount = wordsArray.length;
    const desiredLength = 30;

    if (wordCount < desiredLength) {
      return value;
    }

    let desiredParagraph =  '';
    for (let i = 0; i < desiredLength; i++) {
      if (i === desiredLength - 1) {
        desiredParagraph += wordsArray[i] + '...';
      } else {
        desiredParagraph += wordsArray[i] + ' ';
      }
    }
    return desiredParagraph;
  }

}
