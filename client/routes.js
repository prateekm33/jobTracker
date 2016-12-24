import React from 'react';
import { Route, IndexRoute } from 'react-router';

// import components
import App from './components/App'
// import LandingPage from './components/LandingPage'
import Home from './components/Home/home'

    // <IndexRoute component={ LandingPage } />
module.exports = (
  <Route path='/' component={ App }>
    <Route path='/home' component={ Home } />
  </Route>
)
