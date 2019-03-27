import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, SystemJsNgModuleLoader } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HighlightDirective } from './directive/highlight.directive';
import { UnlessDirective } from './directive/unless.directive';
import { HttpConfigInterceptor } from './interceptors/httpconfig.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { ForbiddenNameDirective } from './directive/forbidden-name.directive';
import { IdentityRevealedValidatorDirective } from './directive/identity-revealed-validator.directive';
import { MessageService } from './services/message.service';
import { HeroService } from './services/hero.service';
import { InMemoryDataService } from './services/in-memory-data.service';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrimeNGModule } from './modules/prime-ng.module';
import { LayoutComponent } from './layout/layout.component';
import { MenuComponent } from './layout/menu/menu.component';
import { TabContainerComponent, TabComponent } from './layout/tab/tab.component';

@NgModule({
  declarations: [
    AppComponent,
    HighlightDirective,
    UnlessDirective,
    ForbiddenNameDirective,
    IdentityRevealedValidatorDirective,
   // LayoutComponent,
    // MenuComponent,
    // TabComponent,
    // TabContainerComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
   // PrimeNGModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { delay: 300 }),
    AppRoutingModule,
  ],
  entryComponents: [
    //在客户端编译的组件均写在这，即传统所说懒加载页面
  ],
  providers: [/*MessageService, HeroService,*/ SystemJsNgModuleLoader,
    // {
    //   provide: TabViewService,
    //   useValue: TabViewService.create(ENTRY_COMPONENTS)
    // },
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
