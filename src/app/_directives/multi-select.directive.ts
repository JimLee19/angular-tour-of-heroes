import { Directive, OnInit, OnDestroy, Optional, Host, Input, HostListener, ElementRef, TemplateRef, ViewContainerRef } from '@angular/core';
import { ControlContainer, FormControlDirective, FormControl, FormControlName, FormArray, FormGroup } from '@angular/forms';
import { NzTreeHigherOrderServiceToken } from 'ng-zorro-antd';
import { Subscription } from 'rxjs';
import { ModelFieldService } from '../services/model-field.service';
import { ModelField } from '../_models/model-field';
import { ReactiveFormComponent } from '../layout/reactive-form/reactive-form.component';
import { ReactiveTableComponent } from '../layout/reactive-table/reactive-table.component';

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
    selector: 'app-reactive-table'
})
export class DynamicFormTableDirective implements OnInit {
    @Input() tableArrayName: string;
    @Input() group: FormGroup;
    @Input() cols: ModelField[];
    constructor(@Optional() @Host() private parent: ReactiveFormComponent, @Optional() private table: ReactiveTableComponent, private modelService: ModelFieldService) {
        console.dir(this.parent);
    }
    ngOnInit() {
        // const arr = this.modelService.buildFormArray(this.table.cols, this.parent.value[this.table.tableArrayName]);
        //  this.table.group.addControl(this.table.tableArrayName, arr);
    }
}
@Directive({
    // tslint:disable-next-line: directive-selector
    selector: 'app-template-control',
})
export class EditBehaviorDirective {
    constructor(private el: ElementRef) { }
    @HostListener('click', ['$event']) onClick($event: any) {
        console.log('clicked: ' + $event );
    }
}
