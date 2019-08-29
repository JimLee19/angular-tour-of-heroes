import { HeroEntryComponents } from './entry_components';
import { MessageService } from '../services/message.service';
import { HeroService } from '../services/hero.service';
import { NgModule } from '@angular/core';
import { HeroRoutingModule } from './hero-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { LayoutModuleModule } from '../layout/layout-module.module';



@NgModule({
  imports: [
    LayoutModuleModule,
    HeroRoutingModule,
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
  ],
})
export class HeroModule { }
