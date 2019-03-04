import { ENTRY_COMPONENTS } from './entry_components';
import { MessageService } from '../services/message.service';
import { HeroService } from '../services/hero.service';
import { NgModule, SystemJsNgModuleLoader } from '@angular/core';
import { HeroComponent } from './hero.component';
import { HeroRoutingModule } from './hero-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LayoutComponent } from '../layout/layout.component';
import { MenuComponent } from '../layout/menu/menu.component';
import { TabContainerComponent, TabComponent } from '../layout/tab/tab.component';
import { PrimeNGModule } from '../modules/prime-ng.module';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from '../services/in-memory-data.service';

@NgModule({
  imports: [
    CommonModule,
    HeroRoutingModule,
    FormsModule,
    PrimeNGModule,
  ],
  declarations: [
    LayoutComponent,
    MenuComponent,
    TabComponent,
    TabContainerComponent,

    HeroComponent,
    ...ENTRY_COMPONENTS
  ],
  entryComponents: [
    //在客户端编译的组件均写在这，即传统所说懒加载页面
    ...ENTRY_COMPONENTS
  ],
  providers: [MessageService, HeroService,SystemJsNgModuleLoader],
})
export class HeroModule { }