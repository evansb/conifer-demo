/// <reference path='server.d.ts' />
import express = require('express')
import webpack = require('webpack')
import webpackDevMiddleware = require('webpack-dev-middleware')
import webpackHotMiddleware = require('webpack-hot-middleware')
import { spawn } from 'child_process'

import config from '../build/webpack.config.development'

const argv = require('minimist')(process.argv.slice(2));
const port = process.env.PORT || 8000
const app = express()
let compiler 

try {
  compiler = webpack(config)
} catch (e) {
  console.error(e)
}

const wdm = webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: {
    colors: true
  }
})

app.use(wdm)
app.use(webpackHotMiddleware(compiler))

const server = app.listen(port, 'localhost', (error: Error) => {
  if (error) {
    return console.error(error)
  }

  if (argv['start-hot']) {
    spawn('npm', ['run', 'start-hot'], { shell: true, env: process.env, stdio: 'inherit'})
      .on('close', code => process.exit(code))
      .on('error', error => console.error(error))
  }

  console.log(`Listening at http://localhost:${port}`)
})

process.on('SIGTERM', () => {
  console.log('Stopping dev server')
  wdm.close()
  server.close(() => {
    process.exit(0)
  })
})