import { FormArray, FormControl } from '@angular/forms';

export interface TableConfig {
    controls: any[];
    /**默认分页数,0表示不分页 */
    defaultPageSize: number;
    /**懒加载 */
    lazy: boolean;
    datasource: any[];
    totals: number;
    /**表格尺寸 */
    size: 'middle' | 'small' | 'default';
    /**分页显示位置 */
    position: 'top' | 'bottom' | 'both';
    pageSizeOption: number[];
    /**是否显示边框 */
    bordered: boolean;
    header: boolean;
    /**表格标题 */
    title?: string;
    /**表格脚注 */
    footer?: string;
}
export class TableFormArray extends FormArray {
    controls: TableFormControl[];
}
export class TableFormControl extends FormControl {
    field: string;
    header: string;
    type: string;
    defaultValue: string;
    min: number;
    max: number;
}
