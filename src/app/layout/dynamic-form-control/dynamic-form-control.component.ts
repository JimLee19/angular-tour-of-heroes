import { Component, OnInit, Input, Directive, ComponentRef, ComponentFactoryResolver, ViewContainerRef, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModelField, Field, SelectItem } from '../../_models/model-field';
import { ComponentBase } from '../component.base';

@Component({
  selector: 'app-dynamic-form-control',
  templateUrl: './dynamic-form-control.component.html',
  styleUrls: ['./dynamic-form-control.component.less']
})
export class DynamicFormControlComponent extends ComponentBase implements Field, OnInit {
  @Input() group: FormGroup;
  @Input() column: ModelField;
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
