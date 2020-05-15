import { Component, OnInit, Input, EventEmitter, Output, ViewChild, TemplateRef } from '@angular/core';
import { ModelField } from '../../_models/model-field';
import { ComponentBase } from '../component.base';

@Component({
  selector: 'app-template-control',
  templateUrl: './template-control.component.html',
  styleUrls: ['./template-control.component.less']
})
export class TemplateControlComponent extends ComponentBase implements OnInit {
  private _value: any;
  @Input() get value(): any {
    return this._value;
  }
  set value(value: any) {
    this._value = value;
    this.valueChange.emit(this._value);
  }
  @Output() valueChange = new EventEmitter<any>();
  @Input() column: ModelField;
  constructor() { super(); }

  ngOnInit(): void {
  }
  get controlType() {
    return this.column.controlType || 'text';
  }
  get placeholder() {
    return this.column.placeholder || this.column.displayName;
  }
  get disabled() {
    return (this.column.readonly || 0) !== 0;
  }
}
