import { Component, OnInit, Input, ViewChild, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';
import { ModelField } from '../../_models/model-field';
import { NzTableComponent, NzInputDirective } from 'ng-zorro-antd';
import { ComponentBase } from '../component.base';

@Component({
  selector: 'app-template-table',
  templateUrl: './template-table.component.html',
  styleUrls: ['./template-table.component.less']
})
export class TemplateTableComponent extends ComponentBase implements OnInit {
  @Input() columns: ModelField[];
  private _values: any[];
  get values(): any[] {
    return this._values;
  }
  @Input() set values(value: any[]) {
    this._values = value;
    this.valuesChange.emit(this._values);
  }
  @Output() valuesChange = new EventEmitter<any[]>();
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
  editId: string | null;
  @ViewChild('templateTable', { static: true }) table: NzTableComponent;
  @ViewChild(NzInputDirective, { static: false, read: ElementRef }) inputElement: ElementRef;
  @HostListener('window:click', ['$event'])
  handleClick(e: MouseEvent): void {
    if (this.editId && this.inputElement && this.inputElement.nativeElement !== e.target) {
      this.editId = null;
    }
  }
  constructor() { super(); }

  ngOnInit(): void {
    console.table(this.values);
  }
  get showColumns() {
    // tslint:disable-next-line: no-bitwise
    return this.columns.filter(x => (x.show & 1) === 1);
  }
  expandContent(vaule: any) {
    const expand = this.columns.find(x => x.propertyName === '_expand');
    return expand && expand.callback && expand.callback(vaule);
  }
  add() {
    this.values = [...this.values, {}];
    this.refreshTable();
  }
  remove() {
    this.values = this.values.filter(x => x['_checked'] !== true);
    this.refreshTable();
  }
  removeAt(i: number) {
    this.values.splice(i, 1);
  }
  private refreshTable() {
    // this.table.updateFrontPaginationDataIfNeeded();
    this.table.nzTotal = this.values.length;
    // const totalPage = Math.floor((this.table.nzTotal + this.table.nzPageSize - 1) / this.table.nzPageSize);
    // const pageIndex = this.table.nzPageIndex > totalPage ? totalPage : this.table.nzPageIndex;
    // this.table.onPageIndexChange(pageIndex);
  }
  get hasCheckedData() {
    const checkedData = this.getCheckedData();
    return checkedData && checkedData.length > 0;
  }
  getCheckedData() {
    return this.values.filter(value => !value.disabled && value['_checked'] === true);
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
  startEdit(id: string): void {
    this.editId = id;
  }

  stopEdit(): void {
    this.editId = null;
  }
  getEditId(col: ModelField, index: number) {
    return `${col.propertyName}_${index}`;
  }
}
