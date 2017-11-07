import { Model, init } from 'resa-class-model';

describe('init decorator', () => {
    test('default parameter', () => {
        @init({state : {}})
        class A extends Model{
        }
        expect(A['__name__']).toEqual('A');
        expect(A['__reducer__']).toEqual('A');
        expect(A['__state__']).toEqual({});
        expect(A['__immutable__']).toEqual(undefined);
    });

    test('name parameter', () => {
        @init({ name: 'ccc', state : {} })
        class A extends Model{
        }
        expect(A['__name__']).toEqual('ccc');
        expect(A['__reducer__']).toEqual('ccc');
        expect(A['__state__']).toEqual({});
        expect(A['__immutable__']).toEqual(undefined);
    });

    test('reducer parameter', () => {
        @init({ name: 'ccc', reducer: 'aaa', state : {} })
        class A extends Model{
        }
        expect(A['__name__']).toEqual('ccc');
        expect(A['__reducer__']).toEqual('aaa');
        expect(A['__state__']).toEqual({});
        expect(A['__immutable__']).toEqual(undefined);
    });

    test('state parameter', () => {
        @init({ state: {b: 'cc'}})
        class A extends Model{
        }
        expect(A['__name__']).toEqual('A');
        expect(A['__reducer__']).toEqual('A');
        expect(A['__state__']).toEqual({b: 'cc'});
        expect(A['__immutable__']).toEqual(undefined);
    });
});
