const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const baseConfig = require('./webpack.config.base');
const checkNodeEnv = require('../scripts/check-node-env');

checkNodeEnv('development');

module.exports = merge(baseConfig, {
  devtool: 'inline-source-map',
  mode: 'development',
  target: 'electron-main',

  entry: {
    main: path.join(__dirname, '../../src/main/main.ts')
  },

  output: {
    path: path.join(__dirname, '../../app'),
    filename: '[name].js',
    library: {
      type: 'commonjs2'
    }
  },

  optimization: {
    minimize: false  // CRITICAL: Bypasses EOL ESLint v8.57.1
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],

  node: {
    __dirname: false,
    __filename: false
  },
});
