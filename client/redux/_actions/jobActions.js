
import types from './actionTypes';

const jobActions = {
  fetchJobs() {
    const actions = this;
    return function(dispatch, getState) {
      dispatch(actions.fetchingJobs());

      const user = getState().user;
      fetch('/accounts/jobs/' + user, {
        method: 'get',
        credentials: 'include'
      })
        .then(r => r.json())
        .then(r => {
          dispatch(actions.fetchedJobs(r));
        })
        .catch(e => {
          dispatch(actions.asyncErrorCaught(e));
        })
    }
  },

  fetchingJobs() {
    return {
      type: types.fetchingJobs
    }
  },

  fetchedJobs(jobs) {
    return {
      type: types.fetchedJobs,
      jobs
    }
  },

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
    const actions = this;
    return function(dispatch, getState) {
      dispatch(actions.saveNewJob(job));
      dispatch(actions.addToList(job));
    }
  },

  addToList(job) {
    return {
      type: types.addToList,
      job
    }
  },

  saveNewJob(job) {
    const actions = this;
    return function(dispatch, getState) {
      dispatch(actions.savingJobs([job]));

      const user = getState().user;
      fetch('/accounts/jobs/' + user, {
        method: 'POST',
        body: JSON.stringify({jobs: [job]}),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'include'
      })
        .then(r => {
          if (r.status !== 200) {
            dispatch(actions.errorSavingJobs([job], r))
          }
          else dispatch(actions.savedJobs([job]));
        })
        .catch(e => {
          dispatch(actions.asyncErrorCaught(e));
        })
    }
  },

  deleteJob(job, idx) {
    return {
      type: types.deleteJob,
      job,
      idx
    }
  },

  saveJobs(jobs) {
    const actions = this;

    return function(dispatch, getState) {
      dispatch(actions.savingJobs(jobs));

      const user = getState().user;
      return fetch('/accounts/jobs/' + user, {
        method: 'put',
        body: JSON.stringify({jobs}),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })
        .then(r => {
          if (r.status === 200) {
            dispatch(actions.savedJobs(jobs));
          }
          else {
            dispatch(actions.errorSavingAllJobs(jobs, r));
          }
          return r;
        })
        .catch(e => { 
          dispatch(actions.asyncErrorCaught(e));
          return e;
        })
    }
  },

  savingJobs(jobs) {
    return {
      type: types.savingJobs,
      jobs
    }
  },

  savedJobs(jobs) {
    return {
      type: types.savedJobs,
      jobs
    }
  },

  errorSavingAllJobs(jobs, r) {
    return {
      type: types.errorSavingAllJobs,
      jobs,
      response: r
    }
  }
}


export default jobActions;