import { } from 'reflect-metadata';
const TAB_METADATA_KEY = Symbol('TabDecorator');
interface TabMetadata {
  name: string;
}

export function TabDecorator(value: TabMetadata) {
  return (target: any) => {
    Reflect.defineMetadata(TAB_METADATA_KEY, value, target);
  };
}

export namespace TabDecorator {
  export function getTabMetadata(target: any): TabMetadata {
    return Reflect.getOwnMetadata(TAB_METADATA_KEY, target);
  }
}