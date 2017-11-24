
declare module 'resa-class-model' {
    export class Model<S = any> {
        protected models: any
        state: S;
        fulfilled(payload?: Partial<S>): void;
        reject(payload?: Partial<S>): void;
    }

    export function effect(string?, number?) : MethodDecorator;

    export function reducer(pure?: boolean) : MethodDecorator;

    export function init<S = any>({ name, reducer, state }
        : { name?: string, reducer?: string, state: S}) : ClassDecorator;

    export function wapper(cb: IterableIterator<any>): Promise<any>;
}