/// <reference path='webpack.d.ts' />

import webpack = require('webpack')
import merge = require('webpack-merge')
import baseConfig from './webpack.config'

export default merge(baseConfig, {
  devtool: 'source-map',

  entry: ['./app/main.development'],

  output: {
    path: __dirname,
    filename: './app/main.js'
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ],

  target: 'electron-main'
})