import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { ModelFieldService } from '../../services/model-field.service';
import { NzTableComponent } from 'ng-zorro-antd';
import { BehaviorSubject } from 'rxjs';
import { ModelField } from '../../_models/model-field';

@Component({
  selector: 'app-dynamic-form-table',
  templateUrl: './dynamic-form-table.component.html',
  styleUrls: ['./dynamic-form-table.component.less']
})
export class DynamicFormTableComponent implements OnInit {
  displayData: any[] = [];
  pagination = true;
  title = '标题';
  size = 'small';
  bordered = false;
  loading = false;
  simple = false;
  sizeChanger = true;
  position = 'bottom';
  footer = '';
  allChecked = false;
  indeterminate = false;
  @Input() formArrayName: string;
  @Input() formGroup: FormGroup;
  @Input() cols: ModelField[];
  @ViewChild('nzTable', { static: true }) table: NzTableComponent;
  @Input() expandContent: (item: any) => string;
  editId: string | null;
  constructor(private modelService: ModelFieldService) { }

  ngOnInit() {
  }
  get arr(): FormArray {
    return this.formGroup.get(this.formArrayName) as FormArray;
  }
  get dataSource(): any[] {
    return this.arr.value;
  }
  get controls() {
    return this.arr.controls;
  }

  getKey(item: FormArray) {
    // console.log(item);
    const keys = Object.keys(item.controls);
    return keys;
  }
  add() {
    this.arr.push(this.modelService.toFormGroup(this.cols)); // 推送form新表单
   // this.controls[0].get('name').disable();
    this.refreshTable();
  }
  remove() {
    const chk = this.controls.filter(x => x['_checked'] === true);
    chk.forEach(x => this.arr.removeAt(this.controls.indexOf(x)));
    this.refreshTable();
  }
  removeAt(i: number) {
    this.arr.removeAt(i); // 根据索引移除对应的表单
  }
  private refreshTable() {
    this.table.updateFrontPaginationDataIfNeeded();
    const pageIndex = Math.floor((this.table.nzTotal + this.table.nzPageSize - 1) / this.table.nzPageSize);
    this.table.emitPageSizeOrIndex(this.table.nzPageSize, pageIndex);
  }
  get hasCheckedData() {
    const checkedData = this.getCheckedData();
    return checkedData && checkedData.length > 0;
  }
  getCheckedData() {
    return this.controls.filter(value => !value.disabled && value['_checked'] === true);
  }
  currentPageDataChange($event: Array<{}>): void {
    this.displayData = $event;
    this.refreshStatus();
  }

  refreshStatus(): void {
    const validData = this.displayData.filter(value => !value.disabled);
    const allChecked = validData.length > 0 && validData.every(value => value['_checked'] === true);
    const allUnChecked = validData.every(value => !value['_checked']);
    this.allChecked = allChecked;
    this.indeterminate = !allChecked && !allUnChecked;
  }

  checkAll(value: boolean): void {
    this.displayData.forEach(data => {
      if (!data.disabled) {
        data['_checked'] = value;
      }
    });
    this.refreshStatus();
  }
  startEdit(id: string, event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.editId = id;
  }
}
