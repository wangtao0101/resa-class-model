import invariant from 'invariant';

function getEmptyObject(immutable) {
    if (immutable) {
        return immutable.Map();
    }
    return {};
}

export default function (options) {
    options = options || {};
    const {
        name,
        reducer,
        state,
        immutable
    } = options;

    return (target) => {
        Object.defineProperty(target, '__name__', {
            value: name || target.name,
            enumerable: false,
            writable: false,
            configurable: false,
        })
        Object.defineProperty(target, '__reducer__', {
            value: reducer || target.__name__,
            enumerable: false,
            writable: false,
            configurable: false,
        })
        Object.defineProperty(target, '__state__', {
            value: state || getEmptyObject(immutable),
            enumerable: false,
            writable: false,
            configurable: false,
        })
        Object.defineProperty(target, '__immutable__', {
            value: immutable,
            enumerable: false,
            writable: false,
            configurable: false,
        })
        return target;
    };
}
