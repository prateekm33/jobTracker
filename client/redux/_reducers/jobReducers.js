
import types from '../_actions/actionTypes';
import * as utils from '../utils';

const jobReducers = {
  jobsList(jobs = [], action) {
    switch (action.type) {
      case types.fetchedJobs:
        return action.jobs;
      case types.sortBy:
        return utils.sortBy(jobs, action);
      case types.addToList:
        return utils.addJob(jobs, action);
      case types.deleteJob:
        return utils.deleteJob(jobs, action);
      default:
        return jobs;
    }
  },

  sortBy(option = null, action) {
    switch (action.type) {
      case types.sortBy:
        return action.option.toLowerCase();
      default:
        return option;
    }
  },

  editJob(formActive = false, action) {
    switch (action.type) {
      case types.editJob:
        return true;
      case types.closeEditJobForm:
        return false;
      default:
        return formActive;
    }
  },

  editJobIdx(idx = -1, action) {
    switch (action.type) {
      case types.editJob:
        return action.idx;
      default:
        return idx;
    }
  },

  jobToEdit(job = {}, action) {
    switch (action.type) {
      case types.editJob:
        return action.job;
      default:
        return job;
    }
  },

  addForm(open = false, action) {
    switch (action.type) {
      case types.addForm:
        return action.open;
      default:
        return open;
    }
  },
}

export default jobReducers;