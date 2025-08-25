import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'linkify',
  standalone: true,
})
export class LinkifyPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return value;
    }
    const urlPattern = /(https?:\/\/[^\s]+)/g;
    return value.replace(urlPattern, '<a href="$1" target="_blank">$1</a>');
  }
}
