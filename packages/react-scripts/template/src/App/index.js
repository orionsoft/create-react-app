import React from 'react'
import Root from 'App/Root'
import Pages from './Pages'
import { Router, Route, browserHistory } from 'react-router'

export default class App extends React.Component {

  render () {
    return (
      <Router history={browserHistory}>
        <Route component={Root}>
          {Pages}
        </Route>
      </Router>
    )
  }
}
