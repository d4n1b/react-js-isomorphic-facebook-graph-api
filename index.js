require('babel-register');
require('css-modules-require-hook')({
  extensions: '.scss',
  generateScopedName: '[name]_[local]__[hash:base64:5]',
  processorOpts: { parser: require('node-sass').parse }
});
require('./src/server.js');
