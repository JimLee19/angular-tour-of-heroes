import { HeroEntryComponents } from './entry_components';
import { MessageService } from '../services/message.service';
import { HeroService } from '../services/hero.service';
import { NgModule, SystemJsNgModuleLoader } from '@angular/core';
import { HeroRoutingModule } from './hero-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PrimeNGModule } from '../modules/prime-ng.module';
import { LayoutComponent } from '../layout/layout.component';
import { MenuComponent } from '../layout/menu/menu.component';
import { TabContainerComponent, TabComponent } from '../layout/tab/tab.component';
import { HomeComponent } from './home/home.component';
import { TableComponent } from '../layout/table/table.component';
import { BarecodeScannerLivestreamModule } from 'ngx-barcode-scanner';

const LayoutComponents = [
  LayoutComponent,
  MenuComponent,
  TabComponent,
  TabContainerComponent,
  TableComponent,
];

@NgModule({
  imports: [
    CommonModule,
    HeroRoutingModule,
    FormsModule,
    PrimeNGModule,
    BarecodeScannerLivestreamModule,
  ],
  declarations: [
    ...LayoutComponents,
    ...HeroEntryComponents,
    HomeComponent
  ],
  entryComponents: [
    //在客户端编译的组件均写在这，即传统所说懒加载页面
    ...LayoutComponents,
    ...HeroEntryComponents
  ],
  providers: [MessageService, HeroService, SystemJsNgModuleLoader],
})
export class HeroModule { }