import { Component, OnInit, Input, SkipSelf } from '@angular/core';
import { FormArray, FormBuilder, Validators, FormGroup, ValidatorFn } from '@angular/forms';
import { ModelFieldService } from '../../services/model-field.service';

@Component({
  selector: 'app-dynamic-table-array',
  templateUrl: './dynamic-table-array.component.html',
  styleUrls: ['./dynamic-table-array.component.less'],
  // providers: [{ provide: TableComponent, useExisting: DynamicTableArrayComponent }] //@SkipSelf() public parent: TableComponent,
})
export class DynamicTableArrayComponent implements OnInit {
  dataSource: any[] = [];
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
  @Input() groupForm: FormGroup;
  cols: any[];
  constructor(private fb: FormBuilder, private modelService: ModelFieldService) {
  }
  get arr(): FormArray {
    return this.groupForm.get(this.formArrayName) as FormArray;
  }
  ngOnInit() {
    this.cols = [
      { propertyName: '_expand', displayName: 'expand', controlType: 'expand' },
      { propertyName: '_rowcheck', displayName: 'rowcheck', controlType: 'rowcheck' },
      { propertyName: 'name', displayName: 'name', controlType: 'text' },
      { propertyName: 'power', displayName: 'power', controlType: 'dropdown' },
      { propertyName: 'alterEgo', displayName: 'alterEgo', controlType: 'text' },
      { propertyName: 'birthday', displayName: 'birthday', controlType: 'date' },
    ];
    for (let i = 0; i < 20; i++) {
      this.dataSource.push({ name: i, power: '55', alterEgo: '45', birthday: '90' });
    }
    this.arr.controls = this.modelService.dataToFormArray(this.cols, this.dataSource);

  }
  get values(): any[] {
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
  }
  remove() {
    const chk = this.values.filter(x => x['_checked'] === true);
    chk.forEach(x => this.arr.removeAt(this.values.indexOf(x)));
  }
  removeAt(i: number) {
    this.arr.removeAt(i); // 根据索引移除对应的表单

  }
  getExpandContent(item: any) {
    return '';
    // const values = item.value;
    // return values['name'] + '描述信息';
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
}
