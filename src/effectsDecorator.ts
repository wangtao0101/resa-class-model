// import invariant from 'invariant';

export default function (effect: string) {
    // invariant(
    //     ['takeEvery', 'takeLatest', 'throttle'].indexOf(effect) > -1,
    //     'effect type should be takeEvery, takeLatest or throttle.'
    // );

    return (target, key: string, descriptor) => { // eslint-disable-line
        // invariant(
        //     descriptor.value.constructor.name === 'GeneratorFunction',
        //     'function decorator by effect should be generator function'
        // );
        const f = descriptor.value;
        descriptor.value = [f, effect]; // eslint-disable-line
        return descriptor;
    };
}
