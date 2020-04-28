import { NgModule, ModuleWithProviders, ErrorHandler, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HtmlPipe } from '../_pipes/html.pipe';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from '../services/in-memory-data.service';
import { CnyPipe } from '../_pipes/cny.pipe';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor, ErrorInterceptor, GlobalErrorHandler } from '../_helpers';
import { HighlightDirective } from '../_directives/highlight.directive';
import { UnlessDirective } from '../_directives/unless.directive';
import { ForbiddenNameDirective } from '../_directives/forbidden-name.directive';
import { IdentityRevealedValidatorDirective } from '../_directives/identity-revealed-validator.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { DynamicFieldDirective } from '../_directives/dynamic-field.directive';
import { MultiSelectParsePipe } from '../_pipes/multi-select-parse.pipe';
import { MultiSelectDirective, DynamicFormTableDirective } from '../_directives/multi-select.directive';



@NgModule({
  declarations: [
    HtmlPipe,
    CnyPipe,
    MultiSelectParsePipe,
    HighlightDirective,
    UnlessDirective,
    ForbiddenNameDirective,
    IdentityRevealedValidatorDirective,
    DynamicFieldDirective,
    MultiSelectDirective,
    DynamicFormTableDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { delay: 300 }),
    DeviceDetectorModule.forRoot(),
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HtmlPipe,
    CnyPipe,
    MultiSelectParsePipe,
    HighlightDirective,
    UnlessDirective,
    ForbiddenNameDirective,
    IdentityRevealedValidatorDirective,
    DynamicFieldDirective,
    MultiSelectDirective,
    DynamicFormTableDirective,
  ]
})
/**共享模块 */
export class SharedModule {
  static forRoot(providers: Provider[] = []): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        ...providers,
        // {
        //   provide: TabViewService,
        //   useValue: TabViewService.create(ENTRY_COMPONENTS)
        // },
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        { provide: ErrorHandler, useClass: GlobalErrorHandler },
      ]
    };
  }
}
