import { NgModule, ModuleWithProviders, Provider, Optional, SkipSelf } from '@angular/core';
import { NgZorroAntdModule, NZ_I18N, zh_CN, NzIconModule, NZ_ICONS, NzConfig, NZ_CONFIG } from 'ng-zorro-antd';


/** 配置 angular i18n **/
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
registerLocaleData(zh);
import {
  MenuFoldOutline,
  MenuUnfoldOutline,
  FormOutline,
  DashboardOutline
} from '@ant-design/icons-angular/icons';
import { throwIfAlreadyLoaded } from './module-import-guard';

const icons = [MenuFoldOutline, MenuUnfoldOutline, DashboardOutline, FormOutline];
const ngZorroConfig: NzConfig = {
  // 注意组件名称没有 nz 前缀
  message: { nzTop: 120 },
  notification: { nzTop: 240 }
};
@NgModule({
  declarations: [
  ],
  imports: [
    NzIconModule,
    NgZorroAntdModule,
  ],
  exports: [
    NzIconModule,
    NgZorroAntdModule, /** 导入 ng-zorro-antd 模块 **/
  ],
  providers: [
    { provide: NZ_CONFIG, useValue: ngZorroConfig },
    { provide: NZ_ICONS, useValue: icons },
    { provide: NZ_I18N, useValue: zh_CN }, /** 配置 ng-zorro-antd 国际化（文案 及 日期） **/
  ],
})
/**特性模块 */
export class FeatureModule {
  // constructor(@Optional() @SkipSelf() parentModule: FeatureModule) {
  //   throwIfAlreadyLoaded(parentModule, 'FeatureModule');
  // }
  static forRoot(providers: Provider[] = []): ModuleWithProviders {
    return {
      ngModule: FeatureModule,
      providers: [
        ...providers,
      ]
    };
  }
}
