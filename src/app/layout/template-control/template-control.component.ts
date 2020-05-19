import { Component, OnInit, Input, EventEmitter, Output, ViewChild, TemplateRef, Optional, ContentChildren, ViewChildren, ElementRef } from '@angular/core';
import { ModelField, SelectItem } from '../../_models/model-field';
import { ComponentBase } from '../component.base';
import { validationMessage } from 'app/common/validation-message';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-template-control',
  templateUrl: './template-control.component.html',
  styleUrls: ['./template-control.component.less']
})
export class TemplateControlComponent extends ComponentBase implements OnInit {
  @Input() name: string;
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
  options: SelectItem[] = [{ label: '强力', value: 'a' }];
  @ViewChild('f', { static: true }) ab: any;
  constructor() { super(); }

  ngOnInit(): void {
    console.log(this.ab);
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

  validationMessage(control: AbstractControl) {
    return validationMessage(this.column, control);
  }
}
