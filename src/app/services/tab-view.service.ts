import { Injectable, ComponentFactoryResolver, Type, ViewContainerRef, ComponentRef } from '@angular/core';
import { ENTRY_COMPONENTS } from '../hero/entry_components';
import { TabDecorator } from '../decorator/tab-component.decorator';
import { TabItem } from '../layout/tab/tab-item';

@Injectable({
  providedIn: 'root'
})
export class TabViewService {
  tabs: TabItem[] = [];
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
  }
  getTabs() {
    if (this.tabs.length > 0) { return this.tabs; }
    for (let c of ENTRY_COMPONENTS) {
      const tabMeta = TabDecorator.getTabMetadata(c);
      if (!tabMeta) { console.error("组件未配置TabComponent信息"); continue; }
      let item = new TabItem(c, { name: tabMeta.name });
      this.tabs.push(item);
    }
    return this.tabs;
  }
  getTab(key: string) {
    const tabs = this.tabs.length > 0 ? this.tabs : this.getTabs();
    return tabs.find(x => x.data.key == key);
  }
  getTabByType(component: Type<any>){
    const tabs = this.tabs.length > 0 ? this.tabs : this.getTabs();
    return tabs.find(x => x.component==component);
  }
  // static create(components: Type<any>[]) {
  //   components.forEach(c => {
  //     let item = new TabItem(c, { name: c['componentName'] || '无名称' });
  //     this.tabs.push(item)
  //   });

  // }
  createComponent<T>(component: Type<T>, parent: ViewContainerRef): ComponentRef<T> {
    if (component === null || component === undefined) {
      return null;
    }
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    let componentRef = parent.createComponent(componentFactory);
    return componentRef;
  }
}
