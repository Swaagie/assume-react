import * as Assume from 'assume';

declare module 'assume' {
  interface Assumption {
    allowProp(type: string, value: string, msg?: string): void,
    elementOfType(element: React.Component | React.SFC, msg?: string): void,
    prop(args: [{string:string}]): void,
    props(args: [{string:string}]): void,
    className(value: string): void,
    child(value: string): void,
    children(value: string): void,
    a(of: string, msg?: string): void,
    an(of: string, msg?: string): void,
  }
}

