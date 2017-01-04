import types from './actionTypes';
import { replace } from 'react-router-redux';

const authActions = {
  authForm(open, id) {
    return {
      type: id === 'sign-up-button' ? types.signUpForm : types.logInForm,
      open
    }
  },

  logOutUser() {
    const actions = this;
    return function(dispatch, getState) {
      dispatch(actions.loggingOut());

      const user = getState().user;
      return fetch('/auth/logout', {
        method: 'POST',
        body: JSON.stringify({email: user}),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'include'
      }).then(r => {
        if (r.status === 200) {
          dispatch(actions.userLoggedOut());
          dispatch(replace('/'));
        } else {
          console.log('error ??? ', r, user)
          dispatch(actions.logOutError());
        }
      }).catch(e => {
        dispatch(actions.asynErrorCaught(e));
      });
    }
  },

  userLoggedOut() {
    return {
      type: types.userLoggedOut
    }
  },

  loggingOut() {
    return {
      type: types.loggingOut
    }
  },

  logOutError() {
    return {
      type: types.logOutError
    }
  },

  checkCredentials(creds) {
    const actions = this;
    return function(dispatch, getState) {
      dispatch(actions.validatingUser());

      return fetch('/auth/login', {
        method: 'POST', 
        body: JSON.stringify(creds),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'include'
      }).then(r => {
        if (r.status === 200) {
          dispatch(actions.userLoggedIn(creds.email));
          dispatch(replace('/home'))
        } else if (r.status === 401) {
          dispatch(actions.invalidCreds());
        }
      })
        .catch(e => { 
          console.log('error: ', e);
          // dispatch(actions.asyncErrorCaught());
        });

    }
  },

  userLoggedIn(email) {
    return {
      type: types.userLoggedIn,
      user: email
    }
  },

  invalidCreds() {
    return {
      type: types.invalidCreds
    }
  },

  validatingUser() {
    console.log('TODO --- VALIDATING USER ----')
    return {
      type: types.validatingUser
    }
  },

  makeAccount(user) {
    const actions = this;
    return function(dispatch, getState) {
      dispatch(actions.makingAccount());

      return fetch('/accounts', {
        method: 'POST', 
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'include'
      }).then(r => {
        console.log('RESPONSE FROM /POST ACCOUNTS: ', r);
        if (r.status === 201) {
          dispatch(replace('/home'));
          dispatch(actions.userLoggedIn(user.email));
        } else {
          dispatch(actions.errorMakingAccount(user));
        }
      })
        .catch(e => { 
          console.log('ERROR: ', e);
          dispatch(actions.asyncErrorCaught(e));
        });
    }
  },

  errorMakingAccount(user) {
    return {
      type: types.errorMakingAccount
    }
  },

  makingAccount() {
    return {
      type: types.makingAccount
    }
  }
}

export default authActions;