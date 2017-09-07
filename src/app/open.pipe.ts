import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'open'
})
export class OpenPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value) {
      return value.filter(res => {
        if (res.status === 'open') {
          return res;
        }
      });
    } else {
      return value;
    }
  }
}
