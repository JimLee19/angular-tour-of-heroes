import { NgModule, ModuleWithProviders } from '@angular/core';
import { LayoutComponents } from './tab/tab-routing.module';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../_modules/shared.module';
import { FeatureModule } from '../_modules/feature.module';
import { RouterModule } from '@angular/router';





@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FeatureModule,
  ],
  declarations: [
    ...LayoutComponents,
  ],
  exports: [
    CommonModule,
    SharedModule,
    FeatureModule,
    ...LayoutComponents,
  ],
  providers: [
  ],
})
export class LayoutModuleModule {
  // static forChild(providers = []): ModuleWithProviders {
  //   return {
  //     ngModule: LayoutModuleModule,
  //     providers: [...providers]
  //   };
  // }
}
