import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'dateRange' })
export class DateRangePipe implements PipeTransform {

  transform(start: Date, end: Date): string {
    
    start = new Date(start);
    end = end ? new Date(end) : new Date();
    if (!start || !end) {
      return '';
    }

    const currentDate = new Date();
    if (end > currentDate) {
      const duration = this.getDuration(start, currentDate);
      return `${this.formatDate(start)} to Now (${duration})`;
    } else {
      const duration = this.getDuration(start, end);
      return `${this.formatDate(start)} to ${this.formatDate(end)} (${duration})`;
    }
  }

  private formatDate(date: Date): string {
    return `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
  }

  private getDuration(start: Date, end: Date): string {
    const diffInMonths = Math.ceil(Math.abs(end.getTime() - start.getTime()) / (1000 * 3600 * 24 * 30));
    if (diffInMonths < 12) {
      return `${diffInMonths} months`;
    } else {
      return `${Math.floor(diffInMonths / 12)} years`;
    }
  }
}

