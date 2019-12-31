import { Injectable } from '@angular/core';
import { FormGroup, FormControl, ValidatorFn, Validators, FormArray } from '@angular/forms';
import { ModelField } from '../_models/model-field';

@Injectable({
  providedIn: 'root'
})
export class ModelFieldService {

  constructor() { }
  dataToFormArray(fields: ModelField[], dataSource: any[]) {
    return dataSource.reduce((arr, data) => {
      const item = this.toFormGroup(fields, data);
      arr.push(item);
      return arr;
    }, []);
  }
  toFormGroup(fields: ModelField[], value?: any) {
    fields = fields.filter(y => !y.propertyName.startsWith('_')) || [];
    const arr = fields.reduce<{ [prop: string]: any }>((item, field) => {
      const defaultValue = value ? value[field.propertyName] : field.defaultValue;
      item[field.propertyName] = new FormControl({ value: defaultValue, disabled: false }, this.getValidators(field));
      return item;
    }, {});
    const group = new FormGroup(arr);
    return group;
  }

  getValidators(field: ModelField) {
    const vds: ValidatorFn[] = [];
    if (field.isRequired) { vds.push(Validators.required); }
    return vds;
  }
}
