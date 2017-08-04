const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/redux-api-middleware-native.js',
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'redux-api-middleware-native.js',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader"
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  }
};
