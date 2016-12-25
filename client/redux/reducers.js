import { combineReducers } from 'redux';
import types from './actionTypes';

import * as utils from './utils';


export const reducer = combineReducers({

  jobsList(state = [], action) {
    switch (action.type) {
      case types.sortBy:
        return utils.sortBy(state, action);
      default:
        return state;
    }
  }

})