import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AccountRoutingModule } from './account-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { LayoutModuleModule } from '../layout/layout-module.module';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    LayoutModuleModule,
    AccountRoutingModule,
  ],
  providers: [
  ],
})
export class AccountModule { }
