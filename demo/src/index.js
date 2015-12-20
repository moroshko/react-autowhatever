import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
// import { devTools } from 'redux-devtools';
// import { DevTools } from 'redux-devtools/lib/react';
// import DiffMonitor from 'redux-devtools-diff-monitor';
import appReducer from 'reducers/app';
import App from 'App/App';

//const store = devTools()(createStore)(appReducer);
const store = createStore(appReducer);

if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('reducers/app', () => {
    const nextRootReducer = require('reducers/app');

    store.replaceReducer(nextRootReducer);
  });
}

class Demo extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <App />
        </Provider>
        {/*<DevTools store={store} monitor={DiffMonitor} />*/}
      </div>
    );
  }
}

ReactDOM.render(
  <Demo />,
  document.getElementById('demo')
);
