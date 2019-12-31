import { Component, OnInit, Input, forwardRef, ViewChildren, QueryList } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicFormTableComponent } from '../dynamic-form-table/dynamic-form-table.component';
@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.less'],
})
export class DynamicFormComponent implements OnInit {
  @Input() formGroup: FormGroup;
  @Input() cols: any[];
  @ViewChildren(DynamicFormTableComponent) formTables: QueryList<DynamicFormTableComponent>;
  constructor() { }

  ngOnInit() {
  }
  onSubmit() {
    console.log(this.formGroup.value);
  }
}
