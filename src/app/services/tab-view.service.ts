import { Injectable, ComponentFactoryResolver, Type, ViewContainerRef, ComponentRef } from '@angular/core';
import { HeroEntryComponents } from '../hero/entry_components';
import { TabDecorator } from '../_decorators/tab-component.decorator';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { TabConfig } from '../layout/tab/tab-config';
import { CacheRouteReuseStrategy } from '../layout/tab/cache-route-reuse-strategy';

@Injectable({
  providedIn: 'root'
})
export class TabViewService {
  private tabs: TabConfig[] = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private componentFactoryResolver: ComponentFactoryResolver) {
    // console.log(this.route, this.router);
  }
  add(tab: TabConfig) {
    let index = this.getIndex(tab.key);
    if (index < 0) {
      this.tabs.push(tab);
      index = this.tabs.length - 1;
    }
    return index;
  }
  addByRoute() {
    const lastRoute = this.getActiveRoute();
    const component: any = lastRoute.component;
    if (!component) { return; }
    const routeConfig = lastRoute.routeConfig;
    const _title = routeConfig && routeConfig.data ? routeConfig.data.title : '';
    const tabMeta = TabDecorator.getTabMetadata(component) || { name: _title || '无标题', closable: true, disabled: false };
    const url = this.router.url;
    const key = window.btoa(encodeURIComponent(url));
    const index = this.add({ key: key, component: component, header: tabMeta.name, disabled: tabMeta.disabled, closable: tabMeta.closable, routeLink: url });
    return index;
  }
  getActiveRoute() {
    let activeRoute = this.route.firstChild;
    while (activeRoute.firstChild) { activeRoute = activeRoute.firstChild; }
    return activeRoute;
  }
  getTabs() {
    return this.tabs;
  }
  getTab(key: string) {
    return this.tabs.find(x => x.key === key);
  }
  getIndex(key: string) {
    return this.tabs.findIndex(x => x.key === key);
  }
  removeTab(key: string) {
    const i = this.getIndex(key);
    const url = decodeURIComponent(window.atob(key));
    CacheRouteReuseStrategy.deleteRouteSnapshot(url);
    this.tabs.splice(i, 1);
    return i;
  }
  getTabByType(component: Type<any>) {
    return this.tabs.find(x => x.component === component);
  }
  createComponent<T>(component: Type<T>, parent: ViewContainerRef): ComponentRef<T> {
    if (component === null || component === undefined) {
      return null;
    }
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    const componentRef = parent.createComponent(componentFactory);
    return componentRef;
  }
}
