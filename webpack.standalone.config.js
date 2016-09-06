var path = require('path');
var webpack = require('webpack');

module.exports = [{
  entry: './src/index.js',

  output: {
    filename: './dist/standalone/autowhatever.js',
    libraryTarget: 'umd',
    library: 'Autowhatever'
  },

  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      include: [
        path.join(__dirname, 'src') // Must be an absolute path
      ]
    }]
  },

  externals: {
    react: 'React'
  }
}, {
  entry: './src/index.js',

  output: {
    filename: './dist/standalone/autowhatever.min.js',
    libraryTarget: 'umd',
    library: 'Autowhatever'
  },

  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      include: [
        path.join(__dirname, 'src') // Must be an absolute path
      ]
    }]
  },

  externals: {
    react: 'React'
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false
      },
      compress: {
        warnings: false
      }
    })
  ]
}];
