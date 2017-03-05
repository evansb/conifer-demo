/// <reference path='webpack.d.ts' />

import path = require('path')
import webpack = require('webpack')
import merge = require('webpack-merge')
import ExtractTextPlugin = require('extract-text-webpack-plugin')
import HtmlWebpackPlugin = require('html-webpack-plugin')
import baseConfig from './webpack.config'

export default merge(baseConfig, {
  devtool: 'cheap-module-source-map',

  entry: ['./app/index'],

  output: {
    path: path.join(__dirname, '../dist'),
    publicPath: '../dist'
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader', 'sass-loader'],
          fallback: 'style-loader'
        })
      },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, use: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, use: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, use: 'url-loader?limit=10000&mimetype=application/octet-stream' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, use: 'file-loader' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, use: 'url-loader?limit=10000&mimetype=image/svg+xml' },

      {
        test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/,
        use: 'url-loader'
      } 
    ]
  },

  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(false),

    new ExtractTextPlugin({ filename: 'style.css', allChunks: true }),

    new HtmlWebpackPlugin({
      filename: './index.html',
      template: 'index.html',
      inject: 'body'
    }),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ],
})