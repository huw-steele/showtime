import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AuthedRoute from './core/AuthedRoute';
import Show from './show/Show';
import Home from './home/Home';

class App extends Component {
  render = () => (
    <Router>
      <Switch>
        <Route path='/login' component={() => <span>Unprotected</span>} />
        <Route path='/shows/:showId' component={Show} />
        <Route exact path='/' component={Home} />
      </Switch>
    </Router>
  )
}

export default App;
