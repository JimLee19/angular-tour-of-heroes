import { NgModule } from '@angular/core';
import { PanelMenuModule } from 'primeng/panelmenu';
import {TabViewModule} from 'primeng/tabview';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';

@NgModule({
  exports: [
    PanelMenuModule,
    TabViewModule,
    InputTextModule,
    DropdownModule
  ]
})
export class PrimeNGModule { }

