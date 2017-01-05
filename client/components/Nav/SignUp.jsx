import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import actions from '../../redux/actions';


import AuthUserInput from './AuthUserInput';
import Flash from '../Flash';
import { validateAuthForm } from '../Utils';

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = { isValid: false };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkPasswordMatch = this.checkPasswordMatch.bind(this);
  }

  componentDidMount() {
    document.body.scrollTop = 0;
  }

  componentWillUnmount() {
    this.props.dispatch(actions.clearFlash());
  }

  handleSubmit(evt) {
    evt.preventDefault();

    const { formValid, error } = validateAuthForm(this.formEl);

    if (!formValid) {
      console.log('TODO --- HANDLE UI INVALID FORM');
      return;
    }

    const pwCopy = this.formEl.querySelector('#user-password-confirm');
    const pw = this.formEl.querySelector('#user-password');

    const pwMatchFlash = 'Passwords do not match';
    if (pwCopy.value !== pw.value) { 
      console.log('TODO --- HANDLE UI-- PASSWORDS DONT MATCH');
      pwCopy.classList.add('auth-input-error')
      pw.classList.add('auth-input-error')
      const isError = true;
      this.props.dispatch(actions.addFlash(pwMatchFlash, isError))
      return false;
    }
    this.props.dispatch(actions.removeFlash(pwMatchFlash))

    const user = {};
    user.password = pw.value;
    user.email = this.formEl.querySelector('#user-email').value;
    this.props.dispatch(actions.makeAccount(user));
  }

  checkPasswordMatch(evt) {
    const target = evt.target;
    const pw = this.formEl.querySelector('#user-password');

    const pwMatchFlash = 'Passwords do not match';
    let isError = true;
    if (pw.value !== target.value) {
      this.props.dispatch(actions.addFlash(pwMatchFlash, isError));
      return;
    }

    this.props.dispatch(actions.removeFlash(pwMatchFlash));
  }

  render() {
    return (
    <div className='auth-form-container'>
      <Flash />
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
            <input onKeyUp={this.checkPasswordMatch} className='form-control' id='user-password-confirm' type='password' placeholder='Confirm password'/>
          </div>
        </div>
        <div className='form-line'>
          <div className='form-line-component'>
            <button onClick={this.handleSubmit} id='submit-login' className='btn btn-primary auth-button'>Sign Up</button>
          </div>
        </div>
      </form>
    </div>
    )
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(SignUp)
