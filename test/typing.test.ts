import { Model, effect, reducer, init, wapper } from 'resa-class-model';
import Immutable from 'immutable';
import createResa from 'resa';

/**
 * plain state
 */

interface MyModelState {
    count: number;
}

@init<MyModelState>({
    name: 'model',
    reducer: 'reducer',
    state: {
        count: 0,
    }
})
class MyModel extends Model<MyModelState>{
    @effect()
    * delayAdd() {
        this.fulfilled({
            count: 1,
        })
        this.add();
    }

    @reducer()
    add(): MyModelState {
        return {
            count: this.state.count + 1,
        };
    }
}

describe('plain state typing success', () => {
    test('register model success', () => {
        const app = createResa();
        app.registerModel(new MyModel());
        app.models.model.delayAdd();
    });
})