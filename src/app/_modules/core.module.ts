import { NgModule, ModuleWithProviders, Optional, SkipSelf, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { throwIfAlreadyLoaded } from './module-import-guard';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    BrowserModule,
    BrowserAnimationsModule,
  ],
  exports: [
    CommonModule,
    RouterModule,
    // HttpClientModule,
    // BrowserModule,
    // BrowserAnimationsModule,
  ]
})
/**核心模块 */
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
  static forRoot(providers: Provider[] = []): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        ...providers,
      ]
    };
  }
}
