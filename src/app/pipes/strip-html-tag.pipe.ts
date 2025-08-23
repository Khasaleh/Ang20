import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stripHtmlTags'
})
export class StripHtmlTagsPipe implements PipeTransform {

  transform(value: string): string {
    const doc = new DOMParser().parseFromString(value, 'text/html');
    const decodedHtml = doc.body.innerHTML;
    return decodedHtml;
  }

}
