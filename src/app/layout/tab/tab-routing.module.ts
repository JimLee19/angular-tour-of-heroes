import { NgModule, Type } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from '../layout.component';
import { MenuComponent } from '../menu/menu.component';
import { TabComponent, TabContainerComponent } from './tab.component';
import { TableComponent } from '../table/table.component';
import { DynamicTableArrayComponent } from '../table/dynamic-table-array.component';

// @NgModule({
//   imports: [RouterModule],
//   exports: [RouterModule]
// })
// export class TabRoutingModule {
//   static forChild(rootComponent: Type<any>, emptyRedirectTo = 'home') {
//     return RouterModule.forChild([
//       { path: '', redirectTo: emptyRedirectTo, pathMatch: 'full' },
//       { path: ':id', component: rootComponent }
//     ]);
//   }
// }

export const LayoutComponents = [
  LayoutComponent,
  MenuComponent,
  TabComponent,
  TabContainerComponent,
  TableComponent,
  DynamicTableArrayComponent,
];
