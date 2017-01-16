
import types from '../_actions/actionTypes';

const authReducers = {
  signUpForm(open = false, action) {
    switch (action.type) {
      case types.signUpForm:
        return action.open;
      default:
        return open;
    }
  },

  logInForm(open = false, action) {
    switch (action.type) {
      case types.logInForm:
        return action.open;
      default:
        return open;
    }
  },

  authenticated(auth = false, action) {
    switch (action.type) {
      case types.userLoggedIn:
        return true;
      case types.userLoggedOut:
        return false;
      default: 
        return auth;
    }
  },

  user(email = null, action) {
    switch (action.type) {
      case types.userLoggedIn:
        return action.user;
      case types.userLoggedOut:
        return null;
      default: 
        return email;
    }
  },

  logInError(error = {error: false}, action) {
    switch (action.type) {
      case types.invalidCreds:
        return {error: true};
      case types.userLoggedIn:
        return {error: false};
      default:
        return error;
    }
  },

  makingAccount(bool = false, action) {
    switch (action.type) {
      case types.makingAccount:
        return true;
      default:
        return bool;
    }
  },

  logOutError(error = false, action) {
    switch (action.type) {
      case types.logOutError:
        return true;
      default: 
        return error;
    }
  }
}

export default authReducers;