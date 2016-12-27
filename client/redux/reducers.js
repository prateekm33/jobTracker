import { combineReducers } from 'redux';
import types from './actionTypes';

import * as utils from './utils';


export const reducer = combineReducers({

  jobsList(jobs = [], action) {
    switch (action.type) {
      case types.sortBy:
        return utils.sortBy(jobs, action);
      default:
        return jobs;
    }
  },

  sortBy(option = null, action) {
    switch(action.type) {
      case types.sortBy:
        return action.option.toLowerCase();
      default:
        return option;
    }
  },

  editJob(formActive = false, action) {
    switch(action.type) {
      case types.editJob:
        return true;
      case types.closeEditJobForm:
        return false;
      default:
        return formActive;
    }
  },

  jobToEdit(job = {}, action) {
    switch(action.type) {
      case types.editJob:
        return action.job;
      default:
        return job;
    }
  }
})