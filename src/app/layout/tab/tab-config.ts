import { Type } from '@angular/core';

export interface TabConfig {
    key?: string;
    header: string;
    closable?: boolean;
    disabled?: boolean;
    data?: any;
    routeLink?: string;
    component?: Type<any>;
}