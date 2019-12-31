import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form-control',
  templateUrl: './dynamic-form-control.component.html',
  styleUrls: ['./dynamic-form-control.component.less']
})
export class DynamicFormControlComponent implements OnInit {
  @Input() formGroup: FormGroup;
  @Input() col: any;
  constructor() { }

  ngOnInit() {
  }

}
