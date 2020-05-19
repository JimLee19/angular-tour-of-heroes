import { NgModule, ErrorHandler } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './_modules/core.module';
import { SharedModule } from './_modules/shared.module';
import { FeatureModule } from './_modules/feature.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
// 导出加载函数
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CoreModule.forRoot(),
    SharedModule,
    FeatureModule.forRoot(),
    // LayoutModuleModule.forRoot(),
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient]
      }
  })
  ],
  entryComponents: [
    // 在客户端编译的组件均写在这，即传统所说懒加载页面
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
