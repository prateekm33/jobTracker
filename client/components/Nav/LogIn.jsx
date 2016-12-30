import React from 'react';
import { Link } from 'react-router';

import { connect } from 'react-redux';
import actions from '../../redux/actions';

import { validateAuthForm } from '../Utils'
import AuthUserInput from './AuthUserInput';

class LogIn extends React.Component {
  constructor() {
    super();
    this.state = { emailValid: false, passwordValid: false };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    document.body.scrollTop = 0;
  }

  componentDidUpdate() {
    const invalid = this.props.invalidCreds;
    if (invalid) {
      this.handleInvalidCreds();
    }
  }

  handleInvalidCreds() {
    console.log('TODO ---- UI FOR INVALID CREDENTIALS')
  }

  handleSubmit(evt) {
    evt.preventDefault();
    console.log('TODO---submitting..');

    if (!validateAuthForm(this.formEl)) {
      // form still invalid
      return;
    }

    const inputs = Array.prototype.slice.call(this.formEl.querySelectorAll('input'));

    const creds = {};
    inputs.forEach(i => {
      if (i.type === 'password') creds.password = i.value;
      if (i.type === 'email') creds.email = i.value;
    });
    this.props.dispatch(actions.checkCredentials(creds));
  }


  render() {
    return (
    <form ref={el => this.formEl = el} id='log-in-form' onSubmit={this.handleSubmit}>
      <div className='form-line'>
        <div className='form-line-component'>
          <div className='form-title'>Log In</div>
          <Link to='/signup' className='sign-up-link'>Sign up</Link>
        </div>
      </div>
      <AuthUserInput />
      <div className='form-line'>
        <div className='form-line-component'>
          <button onClick={this.handleSubmit} id='submit-login' className='btn btn-primary auth-button'>Log In</button>
        </div>
      </div>
    </form>
    )
  }
}

function mapStateToProps(state) { 
  return { invalidCreds: state.logInError };
}

export default connect(mapStateToProps)(LogIn)