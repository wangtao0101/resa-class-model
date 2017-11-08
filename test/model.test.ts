import { Model, effect, reducer, init, wapper } from 'resa-class-model';
import { delay } from 'redux-saga';
import { call } from 'redux-saga/effects';
import createResa from 'resa';

describe('Model test', () => {
    test('default Model', () => {
        @init({ state: 0})
        class A extends Model{
            @effect()
            * add() {
                yield 0;
            }

            @reducer()
            minus(payload) {
                return payload - 1;
            }
        }
        const B = new A();
        expect(B['name']).toEqual('A');
        expect(B['reducerName']).toEqual('A');
        expect(Object.prototype.toString.call(B['effects'].add[0])).toEqual('[object Function]')
        expect(B['effects'].add[1]).toEqual('takeEvery');
        expect(B['reducers'].minus(1)).toEqual(0);
    });
});

@init({
    name: 'model',
    reducer: 'reducer',
    state : {
        count: 0,
    }
})
class MyModel extends Model{
    @effect()
    * delayAdd(payload) {
        yield call(this.fulfilled, payload);
        yield delay(10);
        this.add();
        return 5;
    }

    @effect('takeLatest')
    * count(payload) {
        yield delay(10);
        yield call(this.fulfilled, {
            count: this.state.count + 1,
        });
    }

    @effect()
    * mul(a, b) {
        yield call(this.fulfilled, { count: a * b });
    }

    @reducer()
    add() {
        return this.state.count + 1;
    }

    @reducer(true)
    ['pure'](state, action) {
        return Object.assign({}, state, {count : state.count + action.payload});
    }
}

describe('Model test use resa', () => {
    test('register model success', () => {
        const app = createResa();
        app.registerModel(new MyModel());
        expect(app.models.model).toEqual(expect.objectContaining({
            name: 'model',
            reducerName: 'reducer',
            delayAdd: expect.anything(),
            add: expect.anything(),
        }));
    });

    test('dispatch fulfilled success', () => {
        const app = createResa();
        app.registerModel(new MyModel());
        app.models.model.delayAdd({ a: 'a' });
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(app.store.getState());
            }, 5);
        }).then((data) => {
            expect(data).toEqual({
                resaReducer: {},
                reducer: {
                    a: 'a',
                    count: 0,
                },
            });
        });
    });

    test('dispatch return promise resolve success', () => {
        const app = createResa();
        app.registerModel(new MyModel());
        const model: MyModel = app.models.model;
        return wapper(model.delayAdd({ a: 'a' }))
            .then((data) => {
                expect(data).toEqual(5);
            });
    });

    test('takeLatest', () => {
        const app = createResa();
        app.registerModel(new MyModel());
        app.models.model.count();
        app.models.model.count();
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(app.models.model.state);
            }, 20);
        }).then((data) => {
            expect(data).toEqual({
                count: 1,
            });
        });
    });

    test('multiple args', () => {
        const app = createResa();
        app.registerModel(new MyModel());
        app.models.model.mul(2, 4);
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(app.models.model.state);
            }, 20);
        }).then((data) => {
            expect(data).toEqual({
                count: 8,
            });
        });
    });

    test('pure reducer', () => {
        const app = createResa();
        app.registerModel(new MyModel());
        app.store.dispatch({
            type: 'pure',
            payload: 9,
        });
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(app.models.model.state);
            }, 20);
        }).then((data) => {
            expect(data).toEqual({
                count: 9,
            });
        });
    });
});

@init({
    name: 'model',
    reducer: 'reducer',
    state : 0
})
class OtherModel extends Model{
    @effect()
    * add(count) {
        yield call(this.fulfilled, this.state + count);
    }
}

describe('non object state', () => {
    test('non object state', () => {
        const B = new OtherModel();
        const app = createResa();
        app.registerModel(B);
        app.models.model.add(3);
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(app.models.model.state);
            }, 20);
        }).then((data) => {
            expect(data).toEqual(3);
        });
    });
});

@init({
    name: 'xxModel',
    reducer: 'reducer',
    state : 0
})
class xxModel extends Model{
    models: {
        model: OtherModel,
    }

    @effect()
    * add(count: number) {
        this.models.model.add(count + 5);
    }
}

describe('inject othermodel in model', () => {
    test('run success', () => {
        const other = new OtherModel();
        const xx = new xxModel();
        const app = createResa();
        app.registerModel(other);
        app.registerModel(xx);
        app.models.xxModel.add(3);
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(app.models.model.state);
            }, 100);
        }).then((data) => {
            expect(data).toEqual(8);
        });
    });
});
