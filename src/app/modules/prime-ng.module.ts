import { NgModule } from '@angular/core';
import { PanelMenuModule } from 'primeng/panelmenu';
import {TabViewModule} from 'primeng/tabview';

@NgModule({
  exports: [
    PanelMenuModule,
    TabViewModule,
  ]
})
export class PrimeNGModule { }

