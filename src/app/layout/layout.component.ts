import { Component, OnInit, SystemJsNgModuleLoader, NgModuleFactory, Input } from '@angular/core';
import { TabViewService } from '../services/tab-view.service';
import { Router, ActivatedRoute } from '@angular/router';
import { moneyToUpper } from '../common/utils';
import { TabConfig } from './tab/tab-config';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.less']
})
export class LayoutComponent implements OnInit {
  constructor(
    private router: Router,
    private active: ActivatedRoute,
    public tabViewService: TabViewService) { }
  ngOnInit() {
   // console.log(this.active, this.router.url);
    // this.router.events.subscribe(x=>console.log(x));
    // this.router.navigateByUrl(this.router.url);
  }
}
