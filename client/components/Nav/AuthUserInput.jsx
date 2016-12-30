import React from 'react';

import { validateEmail, validatePassword } from '../Utils';

export default class AuthUserInput extends React.Component {
  constructor() {
    super();
    console.log('TODO VALIDATE email...authuserinput.jsx')
    console.log('TODO VALIDATE password...authuserinput.jsx')
  }

  render() {
    return (
      <div id='auth-user-input-container'>
        <div className='form-line'>
          <div className='form-line-component'>
            <label htmlFor='user-email' className='hidden'> Email </label>
            <input onBlur={(evt) => {validateEmail(evt.target)}} id='user-email' type='email' name='email' placeholder='Email'/>
          </div>
        </div>
        <div className='form-line'>
          <div className='form-line-component'>
            <label htmlFor='user-password' className='hidden'>Password </label>
            <input onBlur={(evt) => { validatePassword(evt.target)}} id='user-password' type='password' name='password' placeholder='Password'/>
          </div>
        </div>
        <input className='hidden' type='submit'/>
      </div>
    )
  }
}