import { Component, OnInit } from '@angular/core';
import { ComponentBase } from '../component.base';
import { TabConfig } from './tab-config';
import { Router, ActivatedRoute, RouteConfigLoadStart, RouteConfigLoadEnd, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TabViewService } from 'app/services/tab-view.service';
import { filter, map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-tab-route',
  templateUrl: './tab-route.component.html',
  styleUrls: ['./tab-route.component.less']
})
export class TabRouteComponent extends ComponentBase implements OnInit {
  // tabItems: TabItem[] = [];
  get tabs(): TabConfig[] {
    return this.tabViewService.getTabs();
  }
  activeIndex: number;
  loading: boolean;
  //  @ViewChild('tabView') tabView: TabView;
  ngOnInit(): void {
    console.log(this.tabs);
  }

  constructor(private router: Router,
    private route: ActivatedRoute,
    private titleService: Title,
    private tabViewService: TabViewService) {
    super();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.route),
      // map(r => {
      //   while (r.firstChild) { r = route.firstChild; }
      //   return r;
      // }),
     // filter(r => r.outlet === 'tab-route')
      ).subscribe((e) => {
        console.log(e);
      // if (e instanceof RouteConfigLoadStart) {
      //   this.loading = true;
      // }
      // if (e instanceof RouteConfigLoadEnd) {
      //   this.loading = false;
      // }
      // if (e instanceof NavigationEnd) {
      //   const index = this.tabViewService.addByRoute();
      //   if (index !== this.activeIndex) {
      //     this.activeIndex = index;
      //   }
      // }
    });
  }
  handleChange(e: TabConfig) {
    this.router.navigateByUrl(e.routeLink);
  }
  handleClose(e: TabConfig) {
    const i = this.tabViewService.removeTab(e.key);
    if (this.activeIndex === i) {
      this.activeIndex = i - 1;
      const url = this.tabs.length > 0 ? this.tabs[i - 1].routeLink : this.route.snapshot.parent.url[0].path;
      this.router.navigateByUrl(url);
    }
  }
}
