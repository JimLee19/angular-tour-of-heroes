import { Component, OnInit } from '@angular/core';
import { TabConfig } from '../layout/tab/tab-config';
import { HomeComponent } from './home/home.component';
import { TabViewService } from '../services/tab-view.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

  constructor(
    private tabViewService: TabViewService) {
    const key = window.btoa(encodeURIComponent("/hero/home"));
    // this.homeTabs=[{key:key,title:'工作台',component:HomeComponent,routeLink:'/hero/home',removable:false,active:true}];
    this.tabViewService.addHomeTabs([{ key: key, header: '工作台', component: HomeComponent, routeLink: '/hero/home', closable: false, disabled: true }]);
  }
  homeTabs: TabConfig[];
  ngOnInit() {

  }

}
