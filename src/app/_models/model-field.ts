import { FormGroup } from '@angular/forms';

export class ModelField {
    propertyName: string;
    displayName: string;
    controlType: string;
    placeholder?: string;
    defaultValue?: string;
    show?: number;
    status?: number;
    readonly?: FieldReadOnly;
    isRequired?: boolean;
    callback?: (data: any) => string;
    /** */
    Attrs?: ModelFieldAttr[];
}
class ModelFieldAttr {
    key: string;
    value: string;
}
export interface Field {
    column: ModelField;
    group: FormGroup;
}
export enum FieldStatus {
}
export enum FieldReadOnly {
    Add = 1,
    Modify = 2,

}
export interface SelectItem {
    label: string;
    value: any;
    styleClass?: string;
    icon?: string;
    title?: string;
    disabled?: boolean;
}
export enum ControlTypeOption {
    /**多选 */
    multiple = 1
}
