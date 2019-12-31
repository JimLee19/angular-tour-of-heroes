import { Pipe, PipeTransform } from '@angular/core';
import { moneyToUpper } from '../common/utils';

@Pipe({
  name: 'cny'
})
export class CnyPipe implements PipeTransform {

  transform(value: any): any {
    if (value == null) { return ''; }
    return moneyToUpper(value);
  }

}
