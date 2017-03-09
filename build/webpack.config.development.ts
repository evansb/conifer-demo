/// <reference path='webpack.d.ts' />

import path = require('path')
import webpack = require('webpack')
import merge = require('webpack-merge')
import { CheckerPlugin } from 'awesome-typescript-loader'
import HtmlWebpackPlugin = require('html-webpack-plugin')

import baseConfig from './webpack.config'

const port = process.env.PORT || 8000
const entry = './app/index'

const publicPath = `http://localhost:${port}/`

const hot = 'webpack-hot-middleware/client?path=' +
  publicPath + '__webpack_hmr'

export default merge(baseConfig, {
  devtool: 'inline-source-map',

  entry: [hot, './src/index'],

  output: {
    publicPath: `http://localhost:${port}/`
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader?sourceMap',
          'sass-loader'
        ]
      }
     ]
  },

  plugins: [
    new CheckerPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(false),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../index.html'),
      inject: 'body'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    })
  ]
})