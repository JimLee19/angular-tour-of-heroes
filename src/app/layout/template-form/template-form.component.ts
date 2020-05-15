import { Component, OnInit, Input, Output, EventEmitter, AfterContentInit, ContentChildren, QueryList } from '@angular/core';
import { ModelField, SelectItem } from '../../_models/model-field';
import { TemplateTableComponent } from '../template-table/template-table.component';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.less']
})
export class TemplateFormComponent implements OnInit, AfterContentInit {
  @Input() columns: ModelField[];
  @Input() model: any;
  options: SelectItem[] = [{ label: '强力', value: 'a' }];
  @Output() submit: EventEmitter<any> = new EventEmitter<any>();
  @ContentChildren(TemplateTableComponent) tables: QueryList<TemplateTableComponent>;
  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit() {
    this.tables.reduce((arr, tb) => {
      const columns = tb.columns.filter(x => x.controlType === 'dropdowan');
      return arr.concat(columns);
    }, []);
  }
  handleSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    console.log(event);
    this.submit.emit(this.model);
    console.log(this.model);
  }
}
