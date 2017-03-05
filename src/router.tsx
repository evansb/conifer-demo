import * as React from 'react'
import { Router, Route, Link, browserHistory } from 'react-router'

export default (
  <Router history={browserHistory}>
    <Router path="/" component={App}>
    </Route>
  </Router>
)