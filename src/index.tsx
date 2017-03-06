import * as React from 'react'
import {render} from 'react-dom'
import {createStore} from './mobx/store'
import {App} from './containers/App'
import './index.scss'

const store = createStore()

render(
  <App store={store} />,
  document.getElementById('root')
)