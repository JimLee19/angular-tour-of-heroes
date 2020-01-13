import { Component, OnInit, Input, forwardRef, ViewChildren, QueryList, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DynamicFormTableComponent } from '../dynamic-form-table/dynamic-form-table.component';
import { ModelField } from '../../_models/model-field';
@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.less'],
})
export class DynamicFormComponent implements OnInit, OnChanges {
  @Input() cols: ModelField[];
  form: FormGroup;
  get controls() { return this.cols.filter(y => !y.propertyName.startsWith('_')) || []; }
  get changes() { return this.form.valueChanges; }
  get valid() { return this.form.valid; }
  get value() { return this.form.value; }
  @Output()
  submit: EventEmitter<any> = new EventEmitter<any>();
  @ViewChildren(DynamicFormTableComponent) formTables: QueryList<DynamicFormTableComponent>;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.createGroup();
  }
  ngOnChanges() {
    if (this.form) {
      const controls = Object.keys(this.form.controls);
      const configControls = this.controls.map((item) => item.propertyName);

      controls
        .filter((control) => !configControls.includes(control))
        .forEach((control) => this.form.removeControl(control));

      configControls
        .filter((control) => !controls.includes(control))
        .forEach((name) => {
          const config = this.cols.find((control) => control.propertyName === name);
          this.form.addControl(name, this.createControl(config));
        });
    }
  }
  handleSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.submit.emit(this.value);
  }
  // getControl(key: string) {
  //   return this.form.get(key);
  // }
  createGroup() {
    const group = this.fb.group({});
    this.controls.forEach(control => group.addControl(control.propertyName, this.createControl(control)));
    return group;
  }

  createControl(config: ModelField) {
    const { status, defaultValue } = config;
    return this.fb.control({ disabled: status === 1, value: defaultValue }, [Validators.required]);
  }
  setDisabled(name: string, disable: boolean) {
    if (this.form.controls[name]) {
      const method = disable ? 'disable' : 'enable';
      this.form.controls[name][method]();
      return;
    }

    this.cols = this.cols.map((item) => {
      if (item.propertyName === name) {
        //  item.disabled = disable;
        item.status = 1;
      }
      return item;
    });
  }

  setValue(name: string, value: any) {
    this.form.controls[name].setValue(value, { emitEvent: true });
  }
}
