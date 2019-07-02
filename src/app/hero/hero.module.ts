import { HeroEntryComponents } from './entry_components';
import { MessageService } from '../services/message.service';
import { HeroService } from '../services/hero.service';
import { NgModule, SystemJsNgModuleLoader } from '@angular/core';
import { HeroRoutingModule } from './hero-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';

/** 配置 angular i18n **/
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
registerLocaleData(zh);


@NgModule({
  imports: [
    CommonModule,
    HeroRoutingModule,
    FormsModule,
    NgZorroAntdModule, /** 导入 ng-zorro-antd 模块 **/
  ],
  declarations: [
    ...HeroEntryComponents,
  ],
  entryComponents: [
    // 在客户端编译的组件均写在这，即传统所说懒加载页面
    ...HeroEntryComponents
  ],
  providers: [
    MessageService,
    HeroService,
    SystemJsNgModuleLoader,
    { provide: NZ_I18N, useValue: zh_CN }, /** 配置 ng-zorro-antd 国际化（文案 及 日期） **/
  ],
})
export class HeroModule { }
