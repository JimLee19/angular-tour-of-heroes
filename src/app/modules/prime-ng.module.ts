import { NgModule } from '@angular/core';
import { PanelMenuModule } from 'primeng/panelmenu';
import { TabViewModule } from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { ContextMenuModule } from 'primeng/contextmenu';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  exports: [
    PanelMenuModule,
    TabViewModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    ContextMenuModule,
    TableModule,
    CalendarModule,
  ]
})
export class PrimeNGModule { }

