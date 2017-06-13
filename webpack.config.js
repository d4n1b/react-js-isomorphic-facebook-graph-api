const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const sourcePath = path.join(__dirname, './src');
const mainFile = path.join(__dirname, './src/app.js');
const publicPath = path.join(__dirname, './public/');
const isProd = (process.env.NODE_ENV === 'production');

const plugins = [
  new AssetsPlugin({
    filename: 'assets.json',
    path: path.join(__dirname, 'dist'),
  }),
  new ExtractTextPlugin('css/app.[hash:5].css'),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: Infinity,
    filename: 'js/vendor.bundle-[hash:5].js'
  }),
  new webpack.EnvironmentPlugin({
    NODE_ENV: process.env.NODE_ENV,
  }),
  new webpack.NamedModulesPlugin(),
  new webpack.NoEmitOnErrorsPlugin() // rebuild after error
];

if (isProd) {
  plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
      },
      output: {
        comments: false,
      },
    })
  );
} else {
  plugins.push(
    new webpack.HotModuleReplacementPlugin()
  );
}

module.exports = {
  devtool: isProd ? '' : 'source-map',
  entry: {
    main: isProd
      ? [mainFile]
      : [
        'webpack-hot-middleware/client',
        mainFile
      ],
    vendor: [
      'axios',
      'lodash',
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'react-router-redux',
      'redux',
      'redux-logger',
      'redux-promise-middleware',
      'redux-thunk'
    ]
  },
  output: {
    path: publicPath,
    filename: 'js/app.bundle-[hash:5].js',
    publicPath: '/static/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          'react-hot-loader',
          'babel-loader'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
         use: [{
          loader: 'html-loader',
          options: {
            minimize: true
          }
        }]
      },
      {
        test: /\.json$/,
        use: ['json-loader']
      },
      {
        test: /\.scss$/,
        use: isProd
          ? ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              { loader: 'css-loader' },
              { loader: 'postcss-loader' },
              { loader: 'sass-loader' },
              {
                loader: 'sass-resources-loader',
                options: {
                  resources: [
                    `${sourcePath}/assets/scss/**/*.scss`
                  ]
                }
              }
            ]
          })
          : [
              { loader: 'style-loader' },
              { loader: 'css-loader' },
              { loader: 'postcss-loader' },
              { loader: 'sass-loader' },
              {
                loader: 'sass-resources-loader',
                options: {
                  resources: [
                    `${sourcePath}/assets/scss/**/*.scss`
                  ]
                }
              }
            ]
      }
    ]
  },
  resolve: {
    extensions: [
      '.webpack-loader.js',
      '.web-loader.js',
      '.loader.js',
      '.js',
      '.jsx'
    ],
    modules: [
      path.resolve(__dirname, 'node_modules'),
      sourcePath
    ],
    alias: {},
  },

  plugins,

  stats: {
    colors: {
      green: '\u001b[32m',
    }
  }
};
