import { Model, reducer, wapper } from 'resa-class-model';

describe('reducer decorator', () => {
    test('default', () => {
        class A extends Model{
            @reducer()
            add(payload) {
                return this.state + 1;
            }
        }
        const B = new A();
        expect(A.prototype['__reducers__'].add).not.toBeUndefined();
    });
});
