import { Component, OnInit, EventEmitter, Output, Input, ViewChild, ChangeDetectorRef } from '@angular/core';
import { TableConfig } from './table-config';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  ngOnInit() {
  }
}
