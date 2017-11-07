declare module 'resa-class-model' {
    export class Model {
        state: any;
        fulfilled(payload?: Object): void;
        reject(payload?: Object): void;
    }

    export function effect(string?, number?) : MethodDecorator;

    export function reducer(pure?: boolean) : MethodDecorator;

    export function init({ name, reducer, state }
        : { name?: string, reducer?: string, state?: Object}) : ClassDecorator;

    export function init() : ClassDecorator;

    export function wapper(cb: IterableIterator<any>): Promise<any>;
}