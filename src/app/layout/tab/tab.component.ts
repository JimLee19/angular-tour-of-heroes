import { Component, OnInit, Input, ViewChild, OnDestroy, ViewContainerRef, ComponentRef, ComponentFactoryResolver, NgModuleFactory, } from '@angular/core';
import { TabConfig } from './tab-config';
import { Router, NavigationEnd, ActivatedRoute, RouteConfigLoadEnd, RouteConfigLoadStart } from '@angular/router';
import { TabViewService } from '../../services/tab-view.service';
import { Title } from '@angular/platform-browser';
import { ComponentBase } from '../component.base';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent implements OnInit {
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
    private title: Title,
    private tabViewService: TabViewService) {
    // this.router.events.pipe(filter(e => e instanceof RouteConfigLoadStart)).subscribe(e=>console.log(e));
    this.router.events.subscribe((e) => {
      if (e instanceof RouteConfigLoadStart) {
        this.loading = true;
      }
      if (e instanceof RouteConfigLoadEnd) {
        this.loading = false;
      }
      if (e instanceof NavigationEnd) {
        const index = this.tabViewService.addByRoute();
        if (index !== this.activeIndex) {
          this.activeIndex = index;
        }
      }
    });
  }
  handleChange(e: TabConfig) {
    this.router.navigateByUrl(e.routeLink);
  }
  handleClose(e: TabConfig) {
    // e.stopPropagation();
    const i = this.tabViewService.removeTab(e.key);
    if (this.activeIndex === i) {
      this.activeIndex = i - 1;
      const url = this.tabs.length > 0 ? this.tabs[i - 1].routeLink : this.route.snapshot.parent.url[0].path;
      this.router.navigateByUrl(url);
    }


    // e.close();
  }
}

@Component({
  selector: 'app-tab-container',
  template: `<template #container></template>`,
  styles: [``]
})
export class TabContainerComponent extends ComponentBase implements OnInit, OnDestroy {

  @Input() tabConfig: TabConfig;
  @ViewChild('container', { read: ViewContainerRef, static: true }) vcRef: ViewContainerRef;
  compRef: ComponentRef<any>;
  constructor(private componentFactoryResolver: ComponentFactoryResolver) { super(); }
  ngOnInit(): void {
    this.loadComponent();
  }
  loadComponent() {

    // const comp = this.vcRef.injector.get(TabItem).component;
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.tabConfig.component);
    this.vcRef.clear();
    this.compRef = this.vcRef.createComponent(componentFactory);
    (<TabConfig>this.compRef.instance).data = this.tabConfig.data;
  }
  _loadComponent() {
    // this.moduleLoader.load(`app/hero/hero.module#HeroModule`)
    //   .then((moduleFactory: NgModuleFactory<any>) => {
    //     console.log(moduleFactory);

    //     // const vcRef = this.vcRef;
    //     // const ngModuleRef = moduleFactory.create(vcRef.parentInjector);
    //     // const comp = ngModuleRef.injector.get(LazyLoadConfig).component;
    //     // const compFactory = ngModuleRef.componentFactoryResolver.resolveComponentFactory(comp);
    //     // this.compRef = vcRef.createComponent(compFactory, 0, ngModuleRef.injector);

    //     //  this.loaded = true;
    //   });
  }
  ngOnDestroy(): void {
    this.compRef.destroy();
  }

}
