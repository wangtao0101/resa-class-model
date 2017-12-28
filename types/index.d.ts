
declare module 'resa-class-model' {
    export class Model<S = any> {
        protected models: any
        state: S;
        fulfilled(payload?: S | Partial<S>): S;
    }

    export function effect(name?: string , mn?: number) : MethodDecorator;

    export function reducer(pure?: boolean) : MethodDecorator;

    export function init<S = any>({ name, state }
        : { name?: string, state: S}) : ClassDecorator;

    export function wapper(cb: IterableIterator<any>): Promise<any>;
}