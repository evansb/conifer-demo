/// <reference path='webpack.d.ts' />

import path = require('path')
import webpack = require('webpack')
import merge = require('webpack-merge')
import ExtractTextPlugin = require('extract-text-webpack-plugin')
import HtmlWebpackPlugin = require('html-webpack-plugin')
import baseConfig from './webpack.config'

export default merge(baseConfig, {
  devtool: 'cheap-module-source-map',

  entry: ['./src/index'],

  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '../dist'),
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader', 'sass-loader'],
          fallback: 'style-loader'
        })
      }
     ]
  },

  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(false),
    new ExtractTextPlugin({ filename: 'style.css', allChunks: true }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ]
})