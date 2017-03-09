import path = require('path')
import webpack = require('webpack')

const isDev = process.env.NODE_ENV === 'development'

const webpackConfig: webpack.Configuration = {
  resolve: {
    extensions: [ '.ts', '.tsx', '.js', '.jsx']
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        use: ['source-map-loader'],
        exclude: ['node_modules'] 
      },
      {
        test: /\.tsx?$/,
        use: ['awesome-typescript-loader'],
        exclude: ['node_modules'] 
      },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, use: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, use: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, use: 'url-loader?limit=10000&mimetype=application/octet-stream' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, use: 'file-loader' },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/,
        use: 'url-loader'
      },
      {
        test: /\.svg/,
        use: 'svg-url-loader'
      }
    ]
  },
  plugins: []
}

export default webpackConfig
