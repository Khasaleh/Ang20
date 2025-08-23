import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceSpecialChars'
})
export class ReplaceSpecialCharsPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';
    // Replace spaces and special characters with underscores
    return value.toLowerCase().replace(/[\s~`!@#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?()._]/g, '_');
  }

}
