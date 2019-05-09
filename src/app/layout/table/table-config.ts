import { LazyLoadEvent } from 'primeng/components/common/api';

export interface TableConfig {
    cols: any[],
    /**默认分页数,0表示不分页 */
    defaultPageSize: number,
    /**懒加载 */
    lazy: boolean,
    models: any[],
    totals: number,
}
export class TableConfig implements TableConfig {
    cols: any[] = [];
    /**默认分页数,0表示不分页 */
    defaultPageSize: number = 20;
    /**懒加载 */
    lazy: boolean = true;
    models: any[] = [];
    totals: number = 0;
}