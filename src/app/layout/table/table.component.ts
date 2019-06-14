import { Component, OnInit, EventEmitter, Output, Input, ViewChild, ChangeDetectorRef } from '@angular/core';
import { TableConfig } from './table-config';

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
  ngOnInit() {
  }
}
