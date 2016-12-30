import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import actions from '../../redux/actions';


import AuthUserInput from './AuthUserInput';
import { validateAuthForm } from '../Utils';

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = { isValid: false };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    document.body.scrollTop = 0;
  }

  handleSubmit(evt) {
    evt.preventDefault();

    if (!validateAuthForm(this.formEl)) {
      console.log('TODO --- HANDLE UI INVALID FORM');
      return;
    }

    const pwCopy = this.formEl.querySelector('#user-password-confirm').value;
    const pw = this.formEl.querySelector('#user-password').value;

    if (pwCopy !== pw) { 
      console.log('TODO --- HANDLE UI-- PASSWORDS DONT MATCH');
      return false;
    }

    const user = {};
    user.password = pw;
    user.email = this.formEl.querySelector('#user-email').value;
    this.props.dispatch(actions.makeAccount(user));
  }

  render() {
    return (
    <form ref={el => {this.formEl = el}} id='sign-up-form' onSubmit={this.handleSubmit}>
      <div className='form-line'>
        <div className='form-line-component'>
          <div className='form-title'>Sign Up</div>
          <Link to='/login' className='log-in-link'>Log In</Link>
        </div>
      </div>
      <AuthUserInput />
      <div className='form-line'>
        <div className='form-line-component'>
          <label htmlFor='user-password-confirm' className='hidden'>Password </label>
          <input id='user-password-confirm' type='password' placeholder='Confirm password'/>
        </div>
      </div>
      <div className='form-line'>
        <div className='form-line-component'>
          <button onClick={this.handleSubmit} id='submit-login' className='btn btn-primary auth-button'>Sign Up</button>
        </div>
      </div>
    </form>
    )
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(SignUp)
