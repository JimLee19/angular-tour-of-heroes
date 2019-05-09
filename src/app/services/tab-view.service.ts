import { Injectable, ComponentFactoryResolver, Type, ViewContainerRef, ComponentRef } from '@angular/core';
import { HeroEntryComponents } from '../hero/entry_components';
import { TabDecorator } from '../_decorators/tab-component.decorator';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { TabConfig } from '../layout/tab/tab-config';

@Injectable({
  providedIn: 'root'
})
export class TabViewService {
  private tabs: TabConfig[] = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private componentFactoryResolver: ComponentFactoryResolver) {
    console.log(this.route, this.router);
  }
  add(tab: TabConfig) {
    let index = this.getIndex(tab.key);
    if(index<0){
      this.tabs.push(tab);
      index=this.tabs.length - 1;
    }
    return index;
  }
  addHomeTabs(homeTabs: TabConfig[]) {
    this.tabs.unshift(...homeTabs);
  }
  getTabs() {
    return this.tabs;
  }
  getTab(key: string) {
    return this.tabs.find(x => x.key == key);
  }
  getIndex(key: string) {
    return this.tabs.findIndex(x => x.key === key);
  }
  getTabByType(component: Type<any>) {
    return this.tabs.find(x => x.component == component);
  }
  createComponent<T>(component: Type<T>, parent: ViewContainerRef): ComponentRef<T> {
    if (component === null || component === undefined) {
      return null;
    }
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    let componentRef = parent.createComponent(componentFactory);
    return componentRef;
  }
}
