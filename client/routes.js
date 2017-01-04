import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

// import components
import App from './components/App'
import LandingPage from './components/LandingPage'
import Home from './components/Home/home'
import SignUp from './components/Nav/SignUp'
import LogIn from './components/Nav/LogIn'

import { authenticateUser } from './utils';

module.exports = (
  <Route path='/' component={ App }>
    <IndexRoute component={ LandingPage } onEnter={authenticateUser} />
    <Route path='/home' onEnter={authenticateUser} component={ Home } />
    <Route path='/signup' component={ SignUp } />
    <Route path='/login' component={ LogIn } />
    <Redirect from='*' to='/home' />
  </Route>
)