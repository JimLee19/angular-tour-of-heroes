import { Component, OnInit, OnChanges, Input, Output, EventEmitter, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { ModelField } from '../../_models/model-field';
import { FormGroup } from '@angular/forms';
import { ReactiveTableComponent } from '../reactive-table/reactive-table.component';
import { ModelFieldService } from '../../services/model-field.service';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.less']
})
export class ReactiveFormComponent implements OnInit, OnChanges, AfterContentInit {
  @Input() cols: ModelField[];
  form: FormGroup;
  get changes() { return this.form.valueChanges; }
  get valid() { return this.form.valid; }
  private _value: any;
  get value() { return this.form.value; }
  @Input() set value(value: any) {
    this._value = value;
    this.valueChange.emit(this._value);
  }
  @Output() valueChange = new EventEmitter<any>();
  @Output() submit: EventEmitter<any> = new EventEmitter<any>();
  @ContentChildren(ReactiveTableComponent) formTables: QueryList<ReactiveTableComponent>;
  constructor(private modelService: ModelFieldService) {
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

