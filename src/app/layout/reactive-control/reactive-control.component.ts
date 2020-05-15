import { Component, OnInit, Input } from '@angular/core';
import { ComponentBase } from '../component.base';
import { Field, ModelField, SelectItem } from '../../_models/model-field';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reactive-control',
  templateUrl: './reactive-control.component.html',
  styleUrls: ['./reactive-control.component.less']
})
export class ReactiveControlComponent extends ComponentBase implements Field, OnInit {
  @Input() group: FormGroup;
  @Input() column: ModelField;
  model: any;
  options: SelectItem[] = [{ label: '强力', value: 'a' }];
  get placeholder() {
    return this.column.placeholder || this.column.displayName;
  }
  get controlType() {
    return this.column.controlType || 'text';
  }
  get control() {
    return this.getControl(this.column.propertyName);
  }
  get disabled() {
    return (this.column.readonly || 0) !== 0;
  }
  get mode() {
    const attrs = this.column.Attrs || [];
    const attr = attrs.find(x => x.key === 'mode');
    return attr && attr.value || 'default';
  }
  constructor() { super(); }

  ngOnInit() {
  }
  getControl(key: string) {
    return this.group.get(key);
  }
  onModelChange(value: any[]) {
    console.dir(value);
    this.control.patchValue(value && Array.of(value).join(','));

  }
}
