import { LayoutComponent } from '../layout.component';
import { MenuComponent } from '../menu/menu.component';
import { TabComponent, TabContainerComponent } from './tab.component';
import { TemplateFormComponent } from '../template-form/template-form.component';
import { ReactiveFormComponent } from '../reactive-form/reactive-form.component';
import { ReactiveControlComponent } from '../reactive-control/reactive-control.component';
import { ReactiveTableComponent } from '../reactive-table/reactive-table.component';
import { TemplateControlComponent } from '../template-control/template-control.component';
import { TemplateTableComponent } from '../template-table/template-table.component';
import { TabRouteComponent } from './tab-route.component';

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
  TabRouteComponent,
  TabContainerComponent,
  TemplateFormComponent,
  TemplateControlComponent,
  TemplateTableComponent,
  ReactiveFormComponent,
  ReactiveControlComponent,
  ReactiveTableComponent,
];
