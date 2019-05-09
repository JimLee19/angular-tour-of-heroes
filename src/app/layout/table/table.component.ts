import { Component, OnInit, EventEmitter, Output, Input, ViewChild, ChangeDetectorRef } from '@angular/core';
import { LazyLoadEvent, SelectItem } from 'primeng/components/common/api';
import { Table } from 'primeng/table';
import { TableConfig } from './table-config';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  vals: any[];
  pageVals: any[];
  selections: any[];
  loading: boolean;
  rows: number;
  rowOptions: SelectItem[];
  _tableConfig: TableConfig;
  get tableConfig() {
    return this._tableConfig;
  }
  @Input() set tableConfig(value: TableConfig) {
    const defaults = { lazy: true, defaultPageSize: 20 };
    this._tableConfig = { ...defaults, ...value };
    console.log(this._tableConfig);
  };
  get totalRecords(): number {
    if (!this.tableConfig.lazy) { return this.tableConfig.models.length; }
    return this.tableConfig.totals;
  };
  @ViewChild('dt') dt: Table;
  @Output() onLazyLoad: EventEmitter<LazyLoadEvent>;
  constructor(private cd: ChangeDetectorRef) {
    this.onLazyLoad = new EventEmitter();
  }
  ngOnInit() {
    this.rows = this.tableConfig.defaultPageSize;
    if (!this.tableConfig.lazy) {
      this.vals = this.tableConfig.models;
    }
    this.rowOptions = [
      { label: '20', value: 20 },
      { label: '50', value: 50 },
      { label: '100', value: 100 },
      { label: '500', value: 500 }
    ];
  }
  ngAfterViewInit() {
    this.cd.detectChanges();
  }
  loadDataLazy(event: LazyLoadEvent) {
    this.loading = true;
    this.onLazyLoad.emit(event);
    this.loading = false;
  }
}
