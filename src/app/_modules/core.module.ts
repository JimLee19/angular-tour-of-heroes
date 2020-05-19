import {
  NgModule,
  ModuleWithProviders,
  Optional,
  SkipSelf,
  Provider,
  ErrorHandler,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, RouteReuseStrategy } from '@angular/router';
import { throwIfAlreadyLoaded } from './module-import-guard';
import {
  JwtInterceptor,
  ErrorInterceptor,
  GlobalErrorHandler,
} from '../_helpers';
import { CacheRouteReuseStrategy } from '../layout/tab/cache-route-reuse-strategy';

const core_list = [
  CommonModule,
  HttpClientModule,
  RouterModule,
  BrowserModule,
  BrowserAnimationsModule,
];

@NgModule({
  imports: [
    ...core_list
  ],
  exports: [
    ...core_list
  ],
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
        // {
        //   provide: TabViewService,
        //   useValue: TabViewService.create(ENTRY_COMPONENTS)
        // },
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        { provide: ErrorHandler, useClass: GlobalErrorHandler },
        /*路由复用策略*/
        { provide: RouteReuseStrategy, useClass: CacheRouteReuseStrategy },
      ],
    };
  }
}
