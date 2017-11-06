import { Model, effect, reducer, init, wapper } from 'resa-class-model';

describe('Model test', () => {
    test('default Model', () => {
        @init()
        class A extends Model{
            @effect()
            * add() {
                yield 0;
            }

            @reducer()
            minus(state) {
                return state - 1;
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