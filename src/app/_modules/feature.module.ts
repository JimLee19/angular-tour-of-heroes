import { NgModule, ModuleWithProviders } from '@angular/core';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';


/** 配置 angular i18n **/
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
registerLocaleData(zh);

@NgModule({
  declarations: [
  ],
  imports: [
    NgZorroAntdModule,
  ],
  exports: [
    NgZorroAntdModule, /** 导入 ng-zorro-antd 模块 **/
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN }, /** 配置 ng-zorro-antd 国际化（文案 及 日期） **/
  ],
})
/**特性模块 */
export class FeatureModule {
  static forRoot(providers = []): ModuleWithProviders {
    return {
      ngModule: FeatureModule,
      providers: [...providers]
    };
  }
 }
