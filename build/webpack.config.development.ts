/// <reference path='webpack.d.ts' />

import webpack = require('webpack')
import merge = require('webpack-merge')
import { CheckerPlugin } from 'awesome-typescript-loader'

import baseConfig from './webpack.config'

const port = process.env.PORT || 8000
const entry = './app/index'

const publicPath = `http://localhost:${port}/`

const hot = 'webpack-hot-middleware/client?path=' +
  publicPath + '__webpack_hmr'

export default merge(baseConfig, {
  devtool: 'inline-source-map',

  entry: [hot, './app/index'],

  output: {
    publicPath: `http://localhost:${port}/dist/`
  },

  module: {
    rules: [
      {
        test: /\.global\.scss$/,
        use: [
          'style-loader',
          'css-loader?sourceMap',
          'sass-loader'
        ]
      },

      {
        test: /^((?!\.global).)*\.scss$/,
        use: [
          'style-loader',
          'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'sass-loader'
        ]
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
    CheckerPlugin,
    new webpack.optimize.OccurrenceOrderPlugin(false),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    })
  ],

  target: 'electron-renderer'
})