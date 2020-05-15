import { Directive, OnChanges, OnInit, Input, ComponentRef, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { Field, ModelField } from '../_models/model-field';
import { FormGroup } from '@angular/forms';
import { ReactiveControlComponent } from '../layout/reactive-control/reactive-control.component';

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: '[dynamicField]'
})
export class DynamicFieldDirective implements Field, OnChanges, OnInit {
    @Input()
    column: ModelField;

    @Input()
    group: FormGroup;

    component: ComponentRef<Field>;

    constructor(
        private resolver: ComponentFactoryResolver,
        private container: ViewContainerRef
    ) { }

    ngOnChanges() {
        if (this.component) {
            this.component.instance.column = this.column;
            this.component.instance.group = this.group;
        }
    }

    ngOnInit() {
        const component = this.resolver.resolveComponentFactory<Field>(ReactiveControlComponent);
        this.component = this.container.createComponent(component);
        this.component.instance.column = this.column;
        this.component.instance.group = this.group;
    }
}
