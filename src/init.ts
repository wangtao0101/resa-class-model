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
        state,
    } = options;

    return (target) => {
        Object.defineProperty(target, '__name__', {
            value: name || target.name,
            enumerable: false,
            writable: false,
            configurable: false,
        })
        Object.defineProperty(target, '__state__', {
            value: state,
            enumerable: false,
            writable: false,
            configurable: false,
        })
        return target;
    };
}
