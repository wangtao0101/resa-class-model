import effectsDecorator from '../src/effectsDecorator';

describe('effectsDecorator', () => {
    test.only('modelDecorator', () => {
        class A {
            @effectsDecorator('takeLatest')
            * add() {
                yield 0;
            }
        }
        console.log(A);
    });
});

describe('modelDecorator', () => {
    test('modelDecorator', () => {

    });
});
