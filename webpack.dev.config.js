var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './demo/src/index'
  ],

  output: {
    path: path.join(__dirname, 'dist'), // Must be an absolute path
    filename: 'index.js',
    publicPath: '/demo/dist'
  },

  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel'],
      include: [
        path.join(__dirname, 'src'), // Must be an absolute path
        path.join(__dirname, 'demo', 'src') // Must be an absolute path
      ]
    }, {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract('style', 'css?modules&localIdentName=[name]__[local]___[hash:base64:5]!postcss!less'),
      exclude: /node_modules/
    }]
  },

  postcss: function() {
    return [autoprefixer];
  },

  resolve: {
    modulesDirectories: ['node_modules', 'components', 'src']
  },

  devtool: 'source-map',

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('app.css')
  ]
};
