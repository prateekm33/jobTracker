

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import actions from '../../redux/actions';

import LogIn from './LogIn';
import SignUp from './SignUp';

export default function Auth (props) {
  // console.log('TODO --- GOOGLE LOGIN / FB LOGIN')
  return (
    <div id='auth-options-container'>
      <Link to='/signup' className='sign-up-link'><div className='btn btn-primary'>Sign Up</div></Link>
      <Link to='/login' className='log-in-link'><div className='btn btn-default'>Log In</div></Link>

      {
        props.logInForm && <LogIn />
      }
      {
        props.signUpForm && <SignUp />
      }
    </div> 
  )
}