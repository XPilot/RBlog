/*eslint-disable*/
// we don't needz eslint here

var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var HtmlwebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'public'),
};

var config = {
  context: PATHS.app,

  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/dev-server',
    PATHS.app + '/app.js',
  ],

  output: {
    path: PATHS.build,
    filename: 'bundle.js',
    publicPath: '/',
  },

  module: {
    loaders: [
      // html
      {
        test: /\html$/,
        loader: 'html',
      },

      // JSX
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['react', 'es2015', 'stage-1']
        }
      },

      // SASS
      {
        test: /\.scss$/,
        loaders: [
          "style-loader",
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ],
      }
    ],
  },

  // plugins
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],

  // resolvers
  resolve: {
    root: PATHS.app,
    extensions: [
      '',
      '.js',
      '.jsx',
      '.css',
      '.scss'
    ],
  },

  // post css
  postcss: [ autoprefixer({ browsers: ['last 2 versions'] }) ],

  devServer: {
    contentBase: PATHS.app,
    historyApiFallback: true,
    hot: true,
    inline: true,
    proxy: {
      '/api/*': 'http://localhost:8090/'
    }
  },

  cache: true,
  debug: true,
  devtool: "eval"
};

/*
console.log('------------------------------');
console.log('Config dev server path: ', config.devServer.contentBase);
*/

module.exports = config;
