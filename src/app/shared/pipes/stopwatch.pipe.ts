import { formatDate } from '@angular/common';
import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stopwatch'
})
export class StopwatchPipe implements PipeTransform {

  constructor(@Inject(LOCALE_ID) private locale: string) {
  }

  transform(value: number | null): any {
    if (value == null) return null;
    const format = value > 3600000 ? "HH:mm:ss:SSS" : "mm:ss.SSS";
    return formatDate(value, format, this.locale);
  }

}
