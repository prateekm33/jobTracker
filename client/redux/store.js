
import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import { reducer } from './reducers';
// import logger from 'redux-logger';
import thunk from 'redux-thunk';
const historyMiddleware = routerMiddleware(browserHistory)


// logger()
const finalCreateStore = compose(
  applyMiddleware(thunk, historyMiddleware)
)(createStore);

const defaultState = {
  jobsList: [],
  editJob: false,
  jobToEdit: null,
  sortBy: '',
  addForm: false,
  editJobIdx: -1,
  authenticated: false,
  signUpForm: false,
  logInForm: false,
  user: null,
  logInError: {error: false},
  makingAccount: false,
  logOutError: false,
  flashMessages: []
}

export function configureStore(initialState = defaultState) {
  return finalCreateStore(reducer, initialState);
}

export const store = configureStore();