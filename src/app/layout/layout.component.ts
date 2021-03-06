import { Component, OnInit } from '@angular/core';
import { TabViewService } from '../services/tab-view.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.less']
})
export class LayoutComponent implements OnInit {
  isReverseArrow = false;
  isCollapsed = false;
  width = 200;
  constructor(
    private router: Router,
    private active: ActivatedRoute,
    public tabViewService: TabViewService) { }
  ngOnInit() {
    // this.router.events.subscribe(x=>console.log(x));
    // this.router.navigateByUrl(this.router.url);
  }
}

