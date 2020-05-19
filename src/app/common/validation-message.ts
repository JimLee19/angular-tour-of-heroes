import { AbstractControl } from '@angular/forms';
import { ModelField } from '../_models/model-field';

const message = {
    minlength: '{0}的长度不能少于{1}',
    maxlength: '{0}的长度不能大于{1}',
    required: '{0}不能为空',
};
export function validationMessage(field: ModelField, control: AbstractControl) {
    if (control && control.invalid && (control.dirty || control.touched) && control.errors) {
        const err = control.errors;
        const key = Object.keys(err)[0];
        return message[key].replace(new RegExp('\\{0\\}', 'g'), field.displayName).replace(new RegExp('\\{1\\}', 'g'), err[key]);
    }
    return '';
}
