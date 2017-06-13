import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { App } from './components/App';
import { Home } from './components/Home';
import { e404 }  from './components/e404';

export default (store) => ({
  component: App,
  childRoutes: [
    {
      path: '/',
      getComponent: (location, callback) => {
        callback(null, Home);
      }
    },
    {
      path: '*',
      getComponent: (location, callback) => {
        callback(null, e404);
      }
    }
  ]
});
