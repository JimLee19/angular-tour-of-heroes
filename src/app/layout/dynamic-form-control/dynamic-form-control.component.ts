import { Component, OnInit, Input, Directive, ComponentRef, ComponentFactoryResolver, ViewContainerRef, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModelField, Field } from '../../_models/model-field';

@Component({
  selector: 'app-dynamic-form-control',
  templateUrl: './dynamic-form-control.component.html',
  styleUrls: ['./dynamic-form-control.component.less']
})
export class DynamicFormControlComponent implements Field, OnInit {
  @Input() group: FormGroup;
  @Input() column: ModelField;
  get placeholder() {
    return this.column.placeholder || this.column.displayName;
  }
  get controlType() {
    return this.column.controlType || 'text';
  }
  constructor() { }

  ngOnInit() {
  }

  getControl(key: string) {
    return this.group.get(key);
  }
}
