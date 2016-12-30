import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import { reducer } from './reducers';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
const historyMiddleware = routerMiddleware(browserHistory)

const finalCreateStore = compose(
  applyMiddleware(logger(), thunk, historyMiddleware)
)(createStore);

// mock data...TODO -> jobsList is set to empty
  // or when user profile feat. set, then pull from DB upon initial load in App component
import { jobs } from './mockData.js'

const defaultState = {
  jobsList: jobs,
  editJob: false,
  jobToEdit: null,
  sortBy: '',
  addForm: false,
  editJobIdx: -1,
  authenticated: false,
  signUpForm: false,
  logInForm: false
}

export default function configureStore(initialState = defaultState) {
  return finalCreateStore(reducer, initialState);
}