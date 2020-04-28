import { Component, OnInit, Input, forwardRef, ViewChildren, QueryList, Output, EventEmitter, OnChanges, ContentChild, ContentChildren, AfterContentInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DynamicFormTableComponent } from '../dynamic-form-table/dynamic-form-table.component';
import { ModelField } from '../../_models/model-field';
import { ModelFieldService } from '../../services/model-field.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.less'],
})
export class DynamicFormComponent implements OnInit, OnChanges, AfterContentInit {
  @Input() cols: ModelField[];
  form: FormGroup;
  get changes() { return this.form.valueChanges; }
  get valid() { return this.form.valid; }
  private _value: any;
  get value() { return this.form.value; }
  @Input() set value(value: any) {
    this._value = value;
  }
  @Output() submit: EventEmitter<any> = new EventEmitter<any>();
  @ContentChildren(DynamicFormTableComponent) formTables: QueryList<DynamicFormTableComponent>;
  constructor(private fb: FormBuilder, private modelService: ModelFieldService) {
  }

  ngOnInit() {
    this.form = this.modelService.createGroup(this.cols);
    this.form.patchValue(this._value);
  }
  ngAfterContentInit() {
    console.dir(this.formTables);
    if (this.formTables) {
      this.formTables.forEach(tb => {
        // this.form.addControl(tb.tableArrayName, this.fb.array([]));
      });
    }
  }
  ngOnChanges() {
    // if (this.form) {
    //   const controls = Object.keys(this.form.controls);
    //   const configControls = this.controls.map((item) => item.propertyName);

    //   controls
    //     .filter((control) => !configControls.includes(control))
    //     .forEach((control) => this.form.removeControl(control));

    //   configControls
    //     .filter((control) => !controls.includes(control))
    //     .forEach((name) => {
    //       const config = this.cols.find((c) => c.propertyName === name);
    //       const control = this.modelService.createControl(config);
    //       this.form.addControl(name, control);
    //     });
    // }
  }
  handleSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    console.log(this.valid);
    this.submit.emit(this.value);
    console.log(this.value);
  }
  // getControl(key: string) {
  //   return this.form.get(key);
  // }
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
