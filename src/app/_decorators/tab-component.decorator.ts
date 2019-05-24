import { } from 'reflect-metadata';
const TAB_METADATA_KEY = Symbol('TabDecorator');
interface TabMetadata {
  name: string;
  closable?: boolean;
  disabled?: boolean;
}
const defaults: TabMetadata = { name: '', closable: true, disabled: false };
/**添加Tab信息 */
export function TabDecorator(value: TabMetadata) {
  return (target: any) => {
    Reflect.defineMetadata(TAB_METADATA_KEY, { ...defaults, ...value }, target);
  };
}

export namespace TabDecorator {
  /**反射获取Tab信息 */
  export function getTabMetadata(target: any): TabMetadata {
    return Reflect.getOwnMetadata(TAB_METADATA_KEY, target);
  }
}
