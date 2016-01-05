import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import appReducer from 'reducers/app';
import App from 'App/App';

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
      </div>
    );
  }
}

ReactDOM.render(
  <Demo />,
  document.getElementById('demo')
);
