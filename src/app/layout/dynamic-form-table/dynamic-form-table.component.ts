import { Component, OnInit, Input, ViewChild, ElementRef, HostListener, Optional, Host, ViewContainerRef } from '@angular/core';
import { FormGroup, FormArray, AbstractControl, FormBuilder, ControlContainer } from '@angular/forms';
import { ModelFieldService } from '../../services/model-field.service';
import { NzTableComponent, NzInputDirective } from 'ng-zorro-antd';
import { BehaviorSubject } from 'rxjs';
import { ModelField } from '../../_models/model-field';
import { DynamicFormControlComponent } from '../dynamic-form-control/dynamic-form-control.component';
import { ComponentBase } from '../component.base';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-dynamic-form-table',
  templateUrl: './dynamic-form-table.component.html',
  styleUrls: ['./dynamic-form-table.component.less']
})
export class DynamicFormTableComponent extends ComponentBase implements OnInit {
  displayData: any[] = [];
  pagination = true;
  title = '标题';
  bordered = false;
  loading = false;
  simple = false;
  sizeChanger = true;
  position = 'bottom';
  footer = '';
  allChecked = false;
  indeterminate = false;
  @Input() tableArrayName: string;
  @Input() group: FormGroup;
  @Input() cols: ModelField[];
  get showCols() {
    // tslint:disable-next-line: no-bitwise
    return this.cols.filter(x => x.show & 1);
  }
  @Input() dataSource: any[];
  @ViewChild('nzTable', { static: true }) table: NzTableComponent;
  // @Input() expandContent: (item: any) => string;
  editId: string | null;
  @ViewChild(NzInputDirective, { static: false, read: ElementRef }) inputElement: ElementRef;

  @HostListener('window:click', ['$event'])
  handleClick(e: MouseEvent): void {
    if (this.editId && this.inputElement && this.inputElement.nativeElement !== e.target) {
      this.editId = null;
    }
  }
  constructor(private fb: FormBuilder,
    private viewContainerRef: ViewContainerRef,
    private modelService: ModelFieldService) {
    super();
  }

  ngOnInit() {
    const arr = this.modelService.buildFormArray(this.cols, this.dataSource);
    this.group.addControl(this.tableArrayName, arr);
    console.log(this.viewContainerRef);
  }
  expandContent(rowId: number) {
    const expand = this.cols.find(x => x.propertyName === '_expand');
    const vaule = this.controls[rowId].value;
    return expand && expand.callback && expand.callback(vaule);
  }
  get arr(): FormArray {
    return <FormArray>this.group.get(this.tableArrayName);
  }
  get controls() {
    return this.arr && this.arr.controls || [];
  }
  getControl(rowId: number, prop: string) {
    return this.controls[rowId].get(prop);
  }
  getKey(item: FormArray) {
    const keys = Object.keys(item.controls);
    return keys;
  }
  add() {
    this.arr.push(this.modelService.createGroup(this.cols));
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
  startEdit(control: AbstractControl, col: ModelField, event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const index = this.controls.indexOf(control);
    this.editId = `${col.propertyName}_${index}`;
  }
  getEditId(control: AbstractControl, col: ModelField) {
    const index = this.controls.indexOf(control);
    return `${col.propertyName}_${index}`;
  }
}
