import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'FormattedDatePipe'
})
export class FormattedDatePipePipe implements PipeTransform {

  constructor(private datePipe: DatePipe, private translate: TranslateService) {}

  transform(value: Date | string, format: string = 'M/d/yy, h:mm a'): string {
    if (!value) return '';

    // Convert to Date object if it's a string
    const dateValue = typeof value === 'string' ? new Date(value) : value;

    // Format date
    const formattedDate = this.datePipe.transform(dateValue, format);
    if (!formattedDate) return '';

    // Extract AM/PM
    const amPmMatch = formattedDate.match(/(AM|PM)$/);
    const amPm = amPmMatch ? amPmMatch[0] : '';

    // Translate AM/PM
    const translatedAmPm = this.translate.instant(amPm);

    // Remove AM/PM from formattedDate and append translated version
    const dateWithoutAmPm = formattedDate.replace(/(AM|PM)$/, '').trim();
    return `${dateWithoutAmPm} ${translatedAmPm}`;
  }
}
