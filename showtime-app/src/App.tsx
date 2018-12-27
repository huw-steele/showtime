import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AuthedRoute from './core/AuthedRoute';
import Show from './show/Show';

class App extends Component {
  render = () => (
    <Router>
      <Switch>
        <Route path='/login' component={() => <span>Unprotected</span>} />
        <Route path='/' component={Show} />
      </Switch>
    </Router>
  )
}

export default App;
