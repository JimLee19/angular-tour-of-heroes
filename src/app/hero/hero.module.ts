import { HeroEntryComponents } from './entry_components';
import { MessageService } from '../services/message.service';
import { HeroService } from '../services/hero.service';
import { NgModule } from '@angular/core';
import { HeroRoutingModule } from './hero-routing.module';
import { SharedModule } from '../_modules/shared.module';
import { FeatureModule } from '../_modules/feature.module';
import { LayoutModuleModule } from '../layout/layout-module.module';



@NgModule({
  imports: [
   // SharedModule,
  //  FeatureModule,
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
