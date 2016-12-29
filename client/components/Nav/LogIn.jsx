import React from 'react';
import { Link } from 'react-router';

export default class LogIn extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
    <form id='log-in-form'>
      <div className='form-line'>
        <div className='form-line-component'>
          <div className='form-title'>Log In</div>
          <Link to='/signup' className='sign-up-link'>Sign up</Link>
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
          <button id='submit-login' className='btn btn-primary auth-button'>Log In</button>
        </div>
      </div>
    </form>
    )
  }
}
