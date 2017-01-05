import React from 'react';

import { validateEmail, validatePassword } from '../Utils';


function AuthUserInput(props) {
  return (
    <div id='auth-user-input-container'>
      <div className='form-line'>
        <div className='form-line-component'>
          <label htmlFor='user-email' className='hidden'> Email </label>
          <input className='form-control' onBlur={(evt) => {validateEmail(evt.target)}} id='user-email' type='email' name='email' placeholder='Email'/>
        </div>
      </div>
      <div className='form-line'>
        <div className='form-line-component'>
          <label htmlFor='user-password' className='hidden'>Password </label>
          <input className='form-control' onBlur={(evt) => { validatePassword(evt.target)}} id='user-password' type='password' name='password' placeholder='Password'/>
        </div>
      </div>
      <input className='hidden' type='submit'/>
    </div>
  )
}

export default AuthUserInput;