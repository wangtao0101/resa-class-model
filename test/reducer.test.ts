import { Model, reducer } from 'resa-class-model';

describe('reducer decorator', () => {
    test('default', () => {
        class A extends Model{
            @reducer()
            add(state) {
                return state + 1;
            }
        }
        expect(A.prototype['__reducers__'].add(0)).toEqual(1);
    });
});
