import express from 'express';
import reactMiddleware from './middlewares/react-render';

const app = express();
const port = 3001;

// -- Development enviroment
if (process.env.NODE_ENV === 'development') {
  var webpack = require('webpack');
  var webpackConfig = require('../webpack.config');
  var compiler = webpack(webpackConfig);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler, {
    log: console.log
  }));
}

// Statics
app.use('/static', express.static('./public'));
app.use('/node_modules', express.static('./node_modules'));

// Middlewares
app.all('*', reactMiddleware);

app.listen(port, (err) => {
  if (err) console.log(`OMG!!! 🙀 ${err}`);
  console.log(`🔥 Running express on port ${port}`);

  if (process.env.NODE_ENV === 'development') {
    console.log('Wait for webpack bundle...');
  }
});
