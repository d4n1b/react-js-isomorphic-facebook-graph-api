import { applyMiddleware, createStore } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router'
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import reducers from '../reducers';

const middlewares = [
  routerMiddleware(browserHistory),
  promise(),
  thunk
];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger());
}

const middleware = applyMiddleware(...middlewares);

export default function configureStore(initialState) {
  return createStore(reducers, initialState, middleware);
}
