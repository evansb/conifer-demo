import path = require('path')
import webpack = require('webpack')

const { dependencies } = require ('../app/package.json')

const isDev = process.env.NODE_ENV === 'development'

const webpackConfig: webpack.Configuration = {
  output: {
    path: path.join(path.resolve(__dirname), 'app'),
    filename: 'bundle.js',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loaders: ['awesome-typescript-loader'],
        exclude: path.resolve(__dirname, 'node_modules')
      }
    ]
  },
  plugins: [],
  externals: Object.keys(dependencies || {})
}

export default webpackConfig
