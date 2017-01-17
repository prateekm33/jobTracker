
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

      const jobs = getState().jobsList;
      dispatch(actions.saveJobs(jobs))
        .then(savedJobsResponse => {
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
              dispatch(actions.logOutError());
            }
          }).catch(e => {
            dispatch(actions.asyncErrorCaught(e));
          });
        })
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
          } else {
            dispatch(actions.invalidCreds());
          }
        })
        .catch(e => { 
          dispatch(actions.asyncErrorCaught());
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
    // console.log('TODO --- VALIDATING USER ----')
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
        if (r.status === 201) {
          dispatch(replace('/home'));
          dispatch(actions.userLoggedIn(user.email));
        } else {
          return r.json();
        }
      })
        .then(errCode => {
          if (errCode === 11000) {
            dispatch(actions.addFlash('There is an account with that email already.', true));
          }
          dispatch(actions.errorMakingAccount(user, errCode));
        })
        .catch(e => { 
          dispatch(actions.asyncErrorCaught(e));
        });
    }
  },

  errorMakingAccount(user, err) {
    return {
      type: types.errorMakingAccount,
      err
    }
  },

  makingAccount() {
    return {
      type: types.makingAccount
    }
  }
}

export default authActions;