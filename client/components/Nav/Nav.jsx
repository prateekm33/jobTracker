import React from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router';

import actions from '../../redux/actions';

import { DropDown } from '../Utils';
import Auth from './Auth';
import UserOptions from './UserOptions';

class Nav extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <nav id='main-nav'>
        <li id='main-logo-li'><Link to='/'>JobTracker</Link></li>
        {
          this.props.authenticated ? <UserOptions /> : <Auth logInForm={this.props.logInForm} signUpForm={this.props.signUpForm}/>
        }
      </nav>
    )
  }
}


function mapStateToProps(state) {
  return { 
    authenticated: state.authenticated,
    logInForm: state.logInForm,
    signUpForm: state.signUpForm
  }
}

export default connect(mapStateToProps)(Nav);

