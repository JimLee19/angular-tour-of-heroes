import { Component, OnInit, Input, Directive, ComponentRef, ComponentFactoryResolver, ViewContainerRef, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModelField, Field } from '../../_models/model-field';
import { ComponentBase } from '../component.base';

@Component({
  selector: 'app-dynamic-form-control',
  templateUrl: './dynamic-form-control.component.html',
  styleUrls: ['./dynamic-form-control.component.less']
})
export class DynamicFormControlComponent  extends ComponentBase implements Field, OnInit {
  @Input() group: FormGroup;
  @Input() column: ModelField;
  get placeholder() {
    return this.column.placeholder || this.column.displayName;
  }
  get controlType() {
    return this.column.controlType || 'text';
  }
  constructor() { super(); }

  ngOnInit() {
  }

  getControl(key: string) {
    return this.group.get(key);
  }
}
