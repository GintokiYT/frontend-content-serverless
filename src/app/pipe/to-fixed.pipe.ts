import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toFixed',
  standalone: true
})
export class ToFixedPipe implements PipeTransform {

  transform(value: string | number): unknown {
    if (typeof value === 'string') {
      const numberValue = parseFloat(value);
      return isNaN(numberValue) ? value : numberValue.toFixed(2);
    } else if (typeof value === 'number') {
      return value.toFixed(2);
    }
    return value;
  }

}
