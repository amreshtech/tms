import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (args === 'byname' && value.length > 8) {
      return this.extract(value, 8) + '...';
    } else if ( args === 'bydesc' && value.length > 20) {
      return this.extract(value, 20) + '...';
    } else if ( args === 'toname' && value.length > 15) {
      return this.extract(value, 15) + '...';
    } else if ( args === 'todesc' && value.length > 25) {
      return this.extract(value, 25) + '...';
    } else {
      return value;
    }
  }

  extract(str: string, len: number) {
    return str.substr(0, len);
  }
}
