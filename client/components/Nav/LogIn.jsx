import React from 'react';
import { Link } from 'react-router';

import { connect } from 'react-redux';
import actions from '../../redux/actions';

import { validateAuthForm } from '../Utils'
import Flash from '../Flash';
import AuthUserInput from './AuthUserInput';

class LogIn extends React.Component {
  constructor() {
    super();
    this.state = { emailValid: false, passwordValid: false };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    document.body.scrollTop = 0;
    this.formEl.querySelector('#user-email').focus()
  }

  componentDidUpdate() {
    const invalid = this.props.invalidCreds.error;
    if (invalid) {
      this.handleInvalidCreds();
    }
  }

  componentWillUnmount() {
    this.props.dispatch(actions.clearFlash());
  }

  handleInvalidCreds() {
    this.props.dispatch(actions.clearFlash());
    const msg = 'Either the username or password is incorrect. Please check and try again.'
    this.props.dispatch(actions.addFlash(msg, true));
  }

  handleSubmit(evt) {
    evt.preventDefault();
    console.log('TODO---submitting..');

    const { formValid, error } = validateAuthForm(this.formEl);

    if (!formValid) {
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
    <div className='auth-form-container'>
      <Flash />
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

    </div>
    )
  }
}

function mapStateToProps(state) { 
  return { invalidCreds: state.logInError };
}

export default connect(mapStateToProps)(LogIn)