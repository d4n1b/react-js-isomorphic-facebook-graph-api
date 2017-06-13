import React from 'react';
import ejs from 'ejs';
import fs from 'fs';
import _ from 'lodash';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import routes from '../routes';
import configureStore from '../config/store.config';

const excludedUrls = [
  '/favicon.ico',
  '/undefined' // invalid css file. Improve this with EJS
];

export default (req, res, next) => {
  if (_.includes(excludedUrls, req.url)) {
    return next();
  }

  const location = req.url;
  const store = configureStore();

  // match the routes to the url
  match({ routes: routes(store), location }, (err, redirect, props) => {
    // `RouterContext` is what the `Router` renders. `Router` keeps these
    // `props` in its state as it listens to `browserHistory`. But on the
    // server our app is stateless, so we need to use `match` to
    // get these props before rendering.
    const appHtml = renderToString(
      <Provider store={store}>
        <RouterContext {...props} />
      </Provider>
    );

    const assets = require('../../dist/assets.json');
    const initialState = JSON.stringify(store.getState());

    // dump the HTML into a template, lots of ways to do this, but none are
    // really influenced by React Router, so we're just using a little
    // function, `renderPage`
    res.send(renderPage({appHtml, assets, initialState}));
  });
}

function renderPage(data) {
  let template = fs.readFileSync(`${__dirname}/../index.html`, 'utf-8');
  template = ejs.render(template, data);

  return template;
}
