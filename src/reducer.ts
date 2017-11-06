import * as invariant from 'invariant';

export default function () {
    return (target, key: string, descriptor: PropertyDescriptor) => {
        invariant(
            Object.prototype.toString.call(descriptor.value) === "[object Function]",
            'function decorator by reducer should be function'
        );
        if (!target.__reducers__) {
            Object.defineProperty(target, '__reducers__', {
                value: {},
                enumerable: false,
                writable: false,
                configurable: false,
            })
        }
        target.__reducers__[key] = descriptor.value;
    };
}