import { applyMiddleware, compose, createStore } from 'redux';
import { reducer } from './reducers';
import logger from 'redux-logger';

const finalCreateStore = compose(
  applyMiddleware(logger())
)(createStore);

// mock data...TODO -> jobsList is set to empty
  // or when user profile feat. set, then pull from DB upon initial load in App component
import { jobs } from './mockData.js'

const defaultState = {
  jobsList: jobs,
  editJob: false,
  jobToEdit: {},
  sortBy: ''
}

export default function configureStore(initialState = defaultState) {
  return finalCreateStore(reducer, initialState);
}