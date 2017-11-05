import { Model, effect } from 'resa-class-model';

describe('effect decorator', () => {
    test.only('default takeEvery', () => {
        class A extends Model{
            @effect()
            * add() {
                yield 0;
            }
        }
        const B = new A();
        expect(Object.prototype.toString.call(A.prototype['__effects__'].add[0])).toEqual('[object Function]')
        expect(A.prototype['__effects__'].add[1] === 'takeEvery');
    });

    test.only('takeLatest', () => {
        class A extends Model{
            @effect('takeLatest')
            * add() {
                yield 0;
            }
        }
        expect(Object.prototype.toString.call(A.prototype['__effects__'].add[0])).toEqual('[object Function]')
        expect(A.prototype['__effects__'].add[1] === 'takeLatest');
    });

    test.only('throttle', () => {
        class A extends Model{
            @effect('throttle', 500)
            * add() {
                yield 0;
            }
        }
        expect(Object.prototype.toString.call(A.prototype['__effects__'].add[0])).toEqual('[object Function]')
        expect(A.prototype['__effects__'].add[1] === 'takeLatest');
        expect(A.prototype['__effects__'].add[2] === 500);
    });
});
