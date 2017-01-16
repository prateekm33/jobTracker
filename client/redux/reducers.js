
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'
import types from './_actions/actionTypes';

import jobReducers from './_reducers/jobReducers';
import authReducers from './_reducers/authReducers';
import flashReducers from './_reducers/flashReducers';

export const reducer = combineReducers(Object.assign({}, 
  { routing : routerReducer }, 
  jobReducers,
  authReducers,
  flashReducers
));