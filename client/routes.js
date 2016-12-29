import React from 'react';
import { Route, IndexRoute } from 'react-router';

// import components
import App from './components/App'
// import LandingPage from './components/LandingPage'
import Home from './components/Home/home'
import SignUp from './components/Nav/SignUp'
import LogIn from './components/Nav/LogIn'

    // <IndexRoute component={ LandingPage } />
module.exports = (
  <Route path='/' component={ App }>
    <Route path='/home' component={ Home } />
    <Route path='/signup' component={ SignUp } />
    <Route path='/login' component={ LogIn } />
  </Route>
)
