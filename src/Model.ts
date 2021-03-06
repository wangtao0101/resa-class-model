///<reference path='../types/index.d.ts' />
import * as clone from 'clone';

export default class Model {
    constructor() {
        this['effects'] = this['__effects__'];
        this['reducers'] = this['__reducers__'];
        this['pureReducers'] = this['__pureReducers__'];
        Object.defineProperty(this, 'name', {
            value: this.constructor['__name__'],
            enumerable: true,
            writable: false,
            configurable: false,
        })
        Object.defineProperty(this, 'state', {
            value: clone(this.constructor['__state__']),
            enumerable: true,
            writable: false,
            configurable: false,
        })
    }
}