import { Pipe, PipeTransform } from '@angular/core';
import { stringToArray } from '../common/utils';

@Pipe({
  name: 'multiSelectParse'
})
export class MultiSelectParsePipe implements PipeTransform {
  transform(value: string): any {
    return stringToArray(value);
  }

}
