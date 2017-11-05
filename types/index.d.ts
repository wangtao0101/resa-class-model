declare module 'resa-class-model' {
    export class Model {
        getState(): any;
        [key: string]: Promise<Object> & any
    }

    export function effect(string?, number?): any;
}