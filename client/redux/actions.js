import types from './actionTypes';
import { push } from 'react-router-redux';

const actions = {
  sortBy(option, reverse) {
    return {
      type: types.sortBy,
      option: option.toLowerCase(),
      reverse: reverse
    }
  },

  editJob(job, idx) {
    return {
      type: types.editJob,
      job: job,
      idx: idx
    }
  },

  closeEditJobForm() {
    return {
      type: types.closeEditJobForm
    }
  },

  addForm(open) {
    return {
      type: types.addForm,
      open
    }
  },

  addJob(job) {
    return {
      type: types.addJob,
      job
    }
  },

  deleteJob(job, idx) {
    return {
      type: types.deleteJob,
      job,
      idx
    }
  },

  authForm(open, id) {
    return {
      type: id === 'sign-up-button' ? types.signUpForm : types.logInForm,
      open
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
        }
      }).then(r => {
        if (r.status === 200) {
          console.log('SUCCESSFULLY VALIDATED USER', r);
          dispatch(actions.userLoggedIn(creds.email));
          dispatch(push('/home'))
        } else if (r.status === 400) {
          dispatch(push('/signup'))
        }
      })
        .catch(e => { 
          console.log('error: ', e);
          dispatch(actions.invalidCreds())
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
    return function(dispatch, getState) {
      dispatch(actions.makingAccount());

      return fetch('/accounts', {
        method: 'POST', 
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json"
        }
      }).then(r => {
        console.log('RESPONSE FROM /POST ACCOUNTS: ', r);
      })
        .catch(e => { console.log('ERROR: ', e)});
    }
  },

  makingAccount() {
    return {
      type: types.makingAccount
    }
  }
}

export default actions;
