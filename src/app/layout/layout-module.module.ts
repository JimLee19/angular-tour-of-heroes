import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';


/** 配置 angular i18n **/
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
registerLocaleData(zh);



@NgModule({
  declarations: [],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule, /** 导入 ng-zorro-antd 模块 **/
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN }, /** 配置 ng-zorro-antd 国际化（文案 及 日期） **/
  ],
})
export class LayoutModuleModule { }
