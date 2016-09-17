import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import appReducer from 'App/redux';
import App from 'App/App';

const store = createStore(appReducer);

if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('App/redux', () => {
    const nextRootReducer = require('App/redux');

    store.replaceReducer(nextRootReducer);
  });
}

function Demo() {
  return (
    <div>
      <Provider store={store}>
        <App />
      </Provider>
    </div>
  );
}

ReactDOM.render(
  <Demo />,
  document.getElementById('demo')
);
