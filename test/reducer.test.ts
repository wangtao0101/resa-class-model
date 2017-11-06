import { Model, reducer, wapper } from 'resa-class-model';

describe('reducer decorator', () => {
    test('default', () => {
        class A extends Model{
            @reducer()
            add(state) {
                return state + 1;
            }
        }
        const B = new A();
        expect(A.prototype['__reducers__'].add(0)).toEqual(1);
    });
});
