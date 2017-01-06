import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

// import components
import App from './components/App'
import LandingPage from './components/LandingPage'
import Home from './components/Home/home'
import SignUp from './components/Nav/SignUp'
import LogIn from './components/Nav/LogIn'
import DNE from './components/DNE'

import { authenticateUser } from './utils';

module.exports = (
  <Route path='/' component={ App }>
    <IndexRoute component={ LandingPage } onEnter={authenticateUser} />
    <Route path='/home' onEnter={authenticateUser} component={ Home } />
    <Route path='/signup' onEnter={authenticateUser} component={ SignUp } />
    <Route path='/login' onEnter={authenticateUser} component={ LogIn } />
    <Route path='*' component={DNE} />
  </Route>
)