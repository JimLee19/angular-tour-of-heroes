import { NgModule, ModuleWithProviders, Optional, SkipSelf, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';



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
    if (parentModule) {
      throw new Error('CoreModule 只能在 AppModule 中加载，且仅能被加载一次。');
    }
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
