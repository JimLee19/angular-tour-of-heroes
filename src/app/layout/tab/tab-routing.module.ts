import { NgModule, Type } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule],
    exports: [RouterModule]
  })
  export class TabRoutingModule {
    static forChild(rootComponent: Type<any>, emptyRedirectTo = 'home') {
      return RouterModule.forChild([
        { path: '', redirectTo: emptyRedirectTo, pathMatch: 'full' },
        { path: ':id', component: rootComponent }
      ]);
    }
  }