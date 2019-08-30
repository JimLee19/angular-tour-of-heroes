import { Component, OnInit, EventEmitter, Output, Input, ViewChild, ChangeDetectorRef } from '@angular/core';
import { TableConfig } from './table-config';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less']
})
export class TableComponent implements OnInit {

  _tableConfig: TableConfig;
  get tableConfig(): TableConfig {
    return this._tableConfig;
  }
  @Input() set tableConfig(value: TableConfig) {
    this._tableConfig = value;
  }
  groupForm: FormGroup;
  constructor(
    private fb: FormBuilder
  ) { }
  ngOnInit() {
    this.groupForm = this.fb.group({

      Arr: this.fb.array([this.createForm()]) // formarray

    });

  }
  private createForm() {

    return this.fb.group({

      control1: ['', Validators.required],

      control2: ['', Validators.required],

      Name: ['', Validators.required],

      Code: ['', Validators.required],

      Level: ['', Validators.required],

      Remark: [''],

    });

  }
  getKey(item: FormArray) {
    console.log(item);
    return Object.keys(item.controls);
  }
  newForm() {

    const arr = this.groupForm.get('Arr') as FormArray;

    arr.push(this.createForm()); // 推送form新表单

  }
  removeForm(i: number) {

    const arr = this.groupForm.get('Arr') as FormArray;

    arr.removeAt(i); // 根据索引移除对应的表单

  }
}
