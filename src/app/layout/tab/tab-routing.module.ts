import { LayoutComponent } from '../layout.component';
import { MenuComponent } from '../menu/menu.component';
import { TabComponent, TabContainerComponent } from './tab.component';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';
import { DynamicFormTableComponent } from '../dynamic-form-table/dynamic-form-table.component';
import { DynamicFormControlComponent } from '../dynamic-form-control/dynamic-form-control.component';

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
  DynamicFormComponent,
  DynamicFormTableComponent,
  DynamicFormControlComponent,
];
