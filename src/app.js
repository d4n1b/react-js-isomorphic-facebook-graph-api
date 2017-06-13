import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { match, Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './config/store.config';
import routes from './routes';

const store = configureStore(window.__INITIAL_STATE__);
const history = syncHistoryWithStore(browserHistory, store);

// Set global vars
window.React = React;
window.store = store;

render(
  <Provider store={store}>
    <Router routes={routes(store)} history={history} />
  </Provider>,
  document.getElementById('app')
);
