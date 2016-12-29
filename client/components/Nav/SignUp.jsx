import React from 'react';
import { Link } from 'react-router';

export default class LogIn extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
    <form id='sign-up-form'>
      <div className='form-line'>
        <div className='form-line-component'>
          <div className='form-title'>Sign Up</div>
          <Link to='/login' className='log-in-link'>Log In</Link>
        </div>
      </div>
      <div className='form-line'>
        <div className='form-line-component'>
          <label htmlFor='user-email' className='hidden'> Email </label>
          <input id='user-email' type='email' placeholder='Email'/>
        </div>
      </div>
      <div className='form-line'>
        <div className='form-line-component'>
          <label htmlFor='user-password' className='hidden'>Password </label>
          <input id='user-password' type='password' placeholder='Password'/>
        </div>
      </div>
       <div className='form-line'>
        <div className='form-line-component'>
          <label htmlFor='user-password-confirm' className='hidden'>Password </label>
          <input id='user-password-confirm' type='password' placeholder='Confirm password'/>
        </div>
      </div>
      <div className='form-line'>
        <div className='form-line-component'>
          <button id='submit-login' className='btn btn-primary auth-button'>Sign Up</button>
        </div>
      </div>
    </form>
    )
  }
}
