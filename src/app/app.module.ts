import { NgModule, ErrorHandler } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './_modules/core.module';
import { SharedModule } from './_modules/shared.module';
import { FeatureModule } from './_modules/feature.module';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CoreModule.forRoot(),
    SharedModule.forRoot(),
    FeatureModule.forRoot(),
    // LayoutModuleModule.forRoot(),
    AppRoutingModule,
  ],
  entryComponents: [
    // 在客户端编译的组件均写在这，即传统所说懒加载页面
  ],
  providers: [
    /*路由复用策略*/
   // { provide: RouteReuseStrategy, useClass: CacheRouteReuseStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
