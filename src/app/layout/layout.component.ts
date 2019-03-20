import { Component, OnInit, SystemJsNgModuleLoader, NgModuleFactory } from '@angular/core';
import { TabViewService } from '../services/tab-view.service';
import { Router, ActivatedRoute } from '@angular/router';
import { moneyToUpper } from '../common/utils';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor(
    private router: Router,
    private active: ActivatedRoute,
    public tabViewService: TabViewService) { }
  ngOnInit() {
    // console.log(this.active,this.active.component);
    // this.router.events.subscribe(x=>console.log(x));
    // this.router.navigateByUrl(this.router.url);
  }
}
