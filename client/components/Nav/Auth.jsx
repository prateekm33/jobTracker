import React from 'react';
import { connect } from 'react-redux';

import actions from '../redux/actions';

class Auth extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(evt) {
    evt.preventDefault();
    const target = evt.target;
    const id = target.id;

    if (id === 'sign-up-button' || id === 'log-in-button') {
      this.props.dispatch(actions.authForm(true, id));
    }
  }

  render() {
    return (
      <div id='auth-options-container' onClick={this.handleClick}>
        <button id='sign-up-button' className="btn btn-primary">Sign Up</button>
        <button id='log-in-button' className="btn btn-default">Log In</button>


        {
          this.props.logOutForm && 
          <form id='log-out-form'>
          </form>
        }
        {
          this.props.signInForm && 
          <form id='sign-in-form'>
          </form>
        }
      </div> 
    )
  }
}

function mapStateToProps(state) {
  return { 
    logOutForm: state.logOutForm,
    signInForm: state.signInForm
  }
}

export default connect(mapStateToProps)(Auth);