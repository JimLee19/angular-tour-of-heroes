import { Directive, OnInit, OnDestroy, Optional, Host, Input } from '@angular/core';
import { ControlContainer, FormControlDirective, FormControl, FormControlName, FormArray, FormGroup } from '@angular/forms';
import { NzTreeHigherOrderServiceToken } from 'ng-zorro-antd';
import { Subscription } from 'rxjs';
import { DynamicFormComponent } from '../layout/dynamic-form/dynamic-form.component';
import { DynamicFormTableComponent } from '../layout/dynamic-form-table/dynamic-form-table.component';
import { ModelFieldService } from '../services/model-field.service';
import { ModelField } from '../_models/model-field';

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: '[multiSelect]'
})
export class MultiSelectDirective implements OnInit, OnDestroy {

    constructor(
        // 注意 : 不雅直接注入 FormGroupDirective | FormGroupName, 注入 ControlContainer 才对.
        // @Optional() private formGroupDirective: FormGroupDirective,
        // @Optional() private formGroupName: FormGroupName,
        private control: ControlContainer, // 通过抽象的 ControlContainer 可以获取到上一层 formGroup
        @Optional() private formControlDirective: FormControlDirective,
        @Optional() private formControlName: FormControlName,
    ) { }
    private sub: Subscription;
    ngOnInit() {
        console.log(this.formControlName, this.control, this.formControlDirective);
        this.formControlName.control.registerOnChange((v: any) => {
            this.formControlName.control.setValue(Array.of(v));
        });
        this.sub = this.formControlName.valueChanges.subscribe(v => {


            // this.formControlDirective.viewToModelUpdate(Array.of(v).join(','));
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
@Directive({
    // tslint:disable-next-line: directive-selector
    selector: 'app-dynamic-form-table'
})
export class DynamicFormTableDirective implements OnInit {
    @Input() tableArrayName: string;
    @Input() group: FormGroup;
    @Input() cols: ModelField[];
    constructor(@Optional() @Host() private parent: DynamicFormComponent, @Optional() private table: DynamicFormTableComponent, private modelService: ModelFieldService) {
        console.dir(this.parent);
    }
    ngOnInit() {
       // const arr = this.modelService.buildFormArray(this.table.cols, this.parent.value[this.table.tableArrayName]);
      //  this.table.group.addControl(this.table.tableArrayName, arr);
    }
}
