import { FormGroup } from '@angular/forms';

export class ModelField {
    propertyName: string;
    displayName: string;
    controlType: string;
    placeholder?: string;
    defaultValue?: string;
    show?: number;
    status?: number;
    isRequired?: boolean;
    callback?: (data: any) => string;
}
export interface Field {
    column: ModelField;
    group: FormGroup;
}
