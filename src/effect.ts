import * as invariant from 'invariant';

export default function (effect: string = 'takeEvery', ms: number = 200) {
    invariant(
        ['takeEvery', 'takeLatest', 'throttle'].indexOf(effect) > -1,
        'effect type should be takeEvery, takeLatest or throttle.'
    );

    return (target, key: string, descriptor: PropertyDescriptor) => {
        invariant(
            Object.prototype.toString.call(descriptor.value) === "[object GeneratorFunction]"
            /** some transfor(typescript) may not realize GeneratorFunction */
            || Object.prototype.toString.call(descriptor.value) === "[object Function]",
            'function decorator by effect should be generator function'
        );
        if (!target.__effects__) {
            Object.defineProperty(target, '__effects__', {
                value: {},
                enumerable: false,
                writable: false,
                configurable: false,
            })
        }
        target.__effects__[key] = [descriptor.value, effect, ms];
    };
}

