import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModelField } from '../../_models/model-field';

@Component({
  selector: 'app-dynamic-form-control',
  templateUrl: './dynamic-form-control.component.html',
  styleUrls: ['./dynamic-form-control.component.less']
})
export class DynamicFormControlComponent implements OnInit {
  @Input() formGroup: FormGroup;
  @Input() col: ModelField;
  get placeholder() {
    return this.col.placeholder || this.col.displayName;
  }
  constructor() { }

  ngOnInit() {
  }

}
