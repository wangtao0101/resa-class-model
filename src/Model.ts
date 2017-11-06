///<reference path='../types/index.d.ts' />
export default class Model {
    constructor() {
        this['effects'] = this['__effects__'];
        this['reducers'] = this['__reducers__'];
        Object.defineProperty(this, 'name', {
            value: this.constructor['__name__'],
            enumerable: true,
            writable: false,
            configurable: false,
        })
        Object.defineProperty(this, 'reducerName', {
            value: this.constructor['__reducer__'],
            enumerable: true,
            writable: false,
            configurable: false,
        })
        Object.defineProperty(this, 'state', {
            value: this.constructor['__state__'],
            enumerable: true,
            writable: false,
            configurable: false,
        })
    }
}