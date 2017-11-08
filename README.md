# resa-class-model

[![NPM version](https://img.shields.io/npm/v/resa-class-model.svg?style=flat)](https://www.npmjs.com/package/resa-class-model)
[![Build Status](https://img.shields.io/travis/wangtao0101/resa-class-model.svg?style=flat)](https://travis-ci.org/wangtao0101/resa-class-model)
[![Coverage Status](https://coveralls.io/repos/github/wangtao0101/resa-class-model/badge.svg?branch=master&dummy=no_cache_please_1)](https://coveralls.io/github/wangtao0101/resa-class-model?branch=master)

## ES / TypeScript decorator for class-style resa model.


### [Example](https://github.com/wangtao0101/resa-example)
```
// App.tsx
import AppModel from './AppModel';
import { connect } from 'resa';
import { wapper } from 'resa-class-model';

interface AppProps {
  count: number;
  appModel: AppModel;
}

class App extends React.Component<AppProps> {
  render() {
    return (
      <div className="App">
          <h1>{this.props.count}</h1>
          <button onClick={() => this.props.appModel.add(1)}>+</button>
          <button onClick={() => this.props.appModel.minus(1)}>-</button>
          <button
            onClick={
              () => this.props.appModel.addAsync(2)}
          >async
          </button>
          <button
            onClick={
              () => wapper(this.props.appModel.addAsync(2)).then(() => { alert('callback'); })}
          >promise
          </button>
      </div>
    );
  }
}

const mapStateToProps = (app, state) => ({
  count: app.appModel.state,
});

const NewApp = connect(mapStateToProps, ['appModel'], null)(App);
```
```
// AppModel.ts
import { Model, reducer, init, effect } from 'resa-class-model';
import { delay } from 'redux-saga';

@init({
    name: 'appModel',
    state: 0
})
export default class AppModel extends Model {
    @effect()
    * addAsync(count: number) {
        yield delay(2000);
        this.add(count);
    }

    @reducer()
    add(count: number) {
        return this.state +  count;
    }

    @reducer()
    minus(count: number) {
        return this.state -  count;
    }
}
```
```
// index.ts
import createResa, { Provider } from 'resa';

import App from './App';
import AppModel from './AppModel';

const app = createResa();
app.registerModel(new AppModel());

ReactDOM.render(
  <Provider store={app.store} resa={app}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
```

### IntelliSense

In model

![GitHub Logo](https://github.com/wangtao0101/resa-class-model/blob/master/img/inmodel.png?raw=true)

In view

![GitHub Logo](https://github.com/wangtao0101/resa-class-model/blob/master/img/inview.png?raw=true)