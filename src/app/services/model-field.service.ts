import { Injectable } from '@angular/core';
import { FormGroup, FormControl, ValidatorFn, Validators, FormArray, FormBuilder } from '@angular/forms';
import { ModelField } from '../_models/model-field';

@Injectable({
  providedIn: 'root'
})
export class ModelFieldService {

  constructor(private fb: FormBuilder) { }
  buildFormArray(fields: ModelField[], dataSource: any[] = []) {
    const arrs = dataSource.map(data => {
      const item = this.createGroup(fields);
      item.patchValue(data);
      return item;
    });
    return this.fb.array(arrs);
  }
  createGroup(fields: ModelField[]) {
    fields = fields.filter(y => !y.propertyName.startsWith('_')) || [];
    const group = this.fb.group({});
    fields.forEach(control => group.addControl(control.propertyName, this.createControl(control)));
    return group;
  }
  createControl(field: ModelField) {
    const { status, defaultValue } = field;
    return this.fb.control({ disabled: status === 1, value: defaultValue }, this.getValidators(field));
  }
  getValidators(field: ModelField) {
    const vds: ValidatorFn[] = [];
    vds.push(Validators.required); // todo: delete
    if (field.isRequired) { vds.push(Validators.required); }
    return vds;
  }
}
