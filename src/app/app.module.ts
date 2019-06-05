import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, SystemJsNgModuleLoader, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HighlightDirective } from './_directives/highlight.directive';
import { UnlessDirective } from './_directives/unless.directive';
import { AppRoutingModule } from './app-routing.module';
import { ForbiddenNameDirective } from './_directives/forbidden-name.directive';
import { IdentityRevealedValidatorDirective } from './_directives/identity-revealed-validator.directive';
import { InMemoryDataService } from './services/in-memory-data.service';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { GlobalErrorHandler } from './_helpers/global-error-handler';
import { ErrorInterceptor } from './_helpers/error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HighlightDirective,
    UnlessDirective,
    ForbiddenNameDirective,
    IdentityRevealedValidatorDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { delay: 300 }),
    AppRoutingModule,
  ],
  entryComponents: [
    // 在客户端编译的组件均写在这，即传统所说懒加载页面
  ],
  providers: [/*MessageService, HeroService,*/ SystemJsNgModuleLoader,
    // {
    //   provide: TabViewService,
    //   useValue: TabViewService.create(ENTRY_COMPONENTS)
    // },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
