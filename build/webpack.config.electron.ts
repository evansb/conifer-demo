/// <reference path='webpack.d.ts' />

import path = require('path')
import webpack = require('webpack')
import merge = require('webpack-merge')
import baseConfig from './webpack.config'

export default merge(baseConfig, {
  devtool: 'source-map',

  entry: ['./app/main.development'],

  output: {
    path: path.join(__dirname, '..'),
    filename: './app/main.js'
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ],

  node: {
    __dirname: false,
    __filename: false
  },

  target: 'electron-main'
})